import { BrowserPage } from './browser-page';
import { BrowserCommandOptions, BrowserCommandResult } from './commands';
import { BrowserOptions, InteractiveBrowser } from './interactive-browser';
import * as constants from './constants';
import { ElementHandle, Page } from 'playwright';
import { clickIfVisible, hasElements, waitForTransaction, waitUntilAvailable, waitUntilVisible, clickWhenAvailable, waitUntilClickable, waitForPageToLoad, isVisible } from './playwright-extensions';
import { Elements, Reference } from './element-reference';
import { AppElements, AppReference, LoginResult } from './app-element-reference';
import { WebDriver } from './abstraction';
import { InvalidOperationError, NotFoundError } from './errors';
import * as Trace from './trace';

export class WebClient extends BrowserPage {

    private get page() {
        return this.browser.page;
    }

    public onlineDomains = constants.Xrm.XrmDomains;

    constructor(options: BrowserOptions) {
        super(new InteractiveBrowser(options));
    }

    public static async create(options: BrowserOptions) {
        const web = new WebClient(options);
        await web.browser.init();
        return web;
    }

    getOptions(commandName) {
        return new BrowserCommandOptions(constants.defaultTraceSource,
            commandName,
            constants.defaultRetryAttempts,
            constants.defaultRetryDelay,
            null,
            true);
    }

    initializeModes() {
        return this.execute(this.getOptions('Initialize Unified Interface Modes'), async ({ page }) => {

            // TODO: driver.SwitchTo().DefaultContent();

            // Wait for main page to load before attempting this. If you don't do this it might still be authenticating and the URL will be wrong
            await this.waitForMainPage();

            let uri = page.url();
            let queryParams = "&flags=easyreproautomation=true";

            // TODO:
            // if (Browser.Options.UCITestMode) queryParams += ",testmode=true";
            // if (Browser.Options.UCIPerformanceMode) queryParams += "&perf=true";

            if (!uri.includes(queryParams) && !uri.includes(encodeURIComponent(queryParams))) {
                let testModeUri = uri + queryParams;

                await page.goto(testModeUri);
            }

            // Again wait for loading
            await this.waitForMainPage();

            return true;
        });
    }

    //@region PageWaits

    async waitForMainPage(timeout: number | undefined = undefined, successCallback: (element: ElementHandle) => Promise<void> = undefined, failureCallback = undefined) {
        timeout = timeout ?? constants.defaultTimeout;
        successCallback = successCallback ?? (
            async e => {
                const isUCI = await hasElements(this.page, Elements.Xpath[Reference.Login.CrmUCIMainPage]);
                if (isUCI)
                    await waitForTransaction(this.page);
            });

        let xpathToMainPage = Elements.Xpath[Reference.Login.CrmMainPage];
        let element = await waitUntilAvailable(this.page, xpathToMainPage, timeout, successCallback, failureCallback);
        return element != null;
    }

    //#endregion

    //#region Login

    public async login(orgUri: string, username: string, password: string, mfaSecretKey: string): Promise<BrowserCommandResult<LoginResult>> {
        return this.execute(this.getOptions('Login'), async (driver, orgUri, username, password, mfaSecretKey) => {

            const online = !(this.onlineDomains && !this.onlineDomains.some(d => orgUri.includes(d)));
            await driver.page.goto(orgUri);

            if (!online)
                return LoginResult.Success;

            await clickIfVisible(this.page, '#use_another_account_link');

            let waitingForOtc = false;
            let success = await this.enterUserName(this.page, username);
            if (!success) {
                let isUserAlreadyLogged = await this.isUserAlreadyLogged();
                if (isUserAlreadyLogged) {
                    // REASON: not relevant in playwright
                    // SwitchToDefaultContent(driver);
                    return LoginResult.Success;
                }

                await this.thinkTime(1000);
                waitingForOtc = (await this.getOtcInput(this.page)) != null;

                if (!waitingForOtc)
                    throw new Error(`Login page failed. ${Reference.Login.UserId} not found.`);
            }

            if (!waitingForOtc) {
                await clickIfVisible(this.page, '#aadTile');
                this.thinkTime(1000);

                // TODO: implement this
                //If expecting redirect then wait for redirect to trigger
                // if (redirectAction != null) {
                //Wait for redirect to occur.
                //     await this.thinkTime(3000);

                //     redirectAction.Invoke(new LoginRedirectEventArgs(username, password, driver));
                //     return LoginResult.Redirect;
                // }

                await this.enterPassword(this.page, password);
                this.thinkTime(1000);
            }

            let attempts = 0;
            let entered: boolean;
            do {
                // entered = await this.enterOneTimeCode(this.page, mfaSecretKey);
                success = await this.clickStaySignedIn(this.page) || await this.isUserAlreadyLogged();
                attempts++;
            }
            while (!success && attempts <= constants.defaultRetryAttempts); // retry to enter the otc-code, if its fail & it is requested again 

            if (entered && !success)
                throw new InvalidOperationError("Something went wrong entering the OTC. Please check the MFA-SecretKey in configuration.");

            return success ? LoginResult.Success : LoginResult.Failure;
        }, orgUri, username, password, mfaSecretKey);
    }

    private isUserAlreadyLogged() {
        return this.waitForMainPage(10 * 1000);
    }

    private async generateOneTimeCode(mfaSecretKey: string) {
        throw new Error('not implemented!');
        /*
        // credits:
        // https://dev.to/j_sakamoto/selenium-testing---how-to-sign-in-to-two-factor-authentication-2joi
        // https://www.nuget.org/packages/Otp.NET/
        const key = mfaSecretKey; // <- this 2FA secret key.

        const base32Bytes = Base32Encoding.ToBytes(key);

        let totp = new Totp(base32Bytes);
        let result = totp.ComputeTotp(); // <- got 2FA coed at this time!
        return result;
        */
    }

    private async enterUserName(page: Page, username: string) {
        let input = await waitUntilAvailable(page, Elements.Xpath[Reference.Login.UserId], 30 * 1000);
        if (input == null)
            return false;

        await input.type(username);
        await input.press('Enter');

        return true;
    }

    private async enterPassword(page: Page, password: string) {
        let input = await page.$(Elements.Xpath[Reference.Login.LoginPassword]);
        await input.type(password);
        // TODO: playwright doesn't have a submit function 
        // await page.click('#submitButton');

        await input.press('Enter');
    }

    private async enterOneTimeCode(page: Page, mfaSecretKey: string) {
        try {
            let input = await this.getOtcInput(page); // wait for the dialog, even if key is null, to print the right error
            if (input == null)
                return true;

            if (mfaSecretKey == null)
                throw new InvalidOperationError("The application is wait for the OTC but your MFA-SecretKey is not set. Please check your configuration.");

            let oneTimeCode = this.generateOneTimeCode(mfaSecretKey);
            // TODO:
            // SetInputValue(page, input, oneTimeCode, 1 * 1000);
            // input.Submit();
            return true; // input found & code was entered
        }
        catch (e) {
            const message = `An Error occur entering OTC. Exception: ${e.message}`;
            Trace.traceInformation(message);
            throw new InvalidOperationError(message);
        }
    }

    private getOtcInput(page: Page) {
        return waitUntilAvailable(page, Elements.Xpath[Reference.Login.OneTimeCode], 2 * 1000);
    }

    private async clickStaySignedIn(page: Page) {
        let xpath = Elements.Xpath[Reference.Login.StaySignedIn];
        let element = await clickIfVisible(page, xpath, 5 * 1000);
        return element != null;
    }

    //#endregion

    //#region Navigation

    public async openApp(appName: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);

        return this.execute(this.getOptions(`Open App ${appName}`), async (driver) => {
            // not relevant in playwright
            await waitForPageToLoad(driver.page);
            // driver.SwitchTo().DefaultContent();

            //Handle left hand Nav in Web Client
            let success = await this.tryToClickInAppTile(appName, driver) ||
                await this.tryOpenAppFromMenu(driver, appName, AppReference.Navigation.WebAppMenuButton) ||
                await this.tryOpenAppFromMenu(driver, appName, AppReference.Navigation.UCIAppMenuButton);

            if (!success)
                throw new InvalidOperationError(`App Name ${appName} not found.`);


            await driver.page.waitForTimeout(1000);
            await this.waitForMainPage();
            await this.initializeModes();

            // Wait for app page elements to be visible (shell and sitemapLauncherButton)

            let shell = await waitUntilVisible(driver.page, AppElements.Xpath[AppReference.Application.Shell]);
            let sitemapLauncherButton = await waitUntilVisible(driver.page, AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton]);

            success = shell != null && sitemapLauncherButton != null;

            if (!success)
                throw new InvalidOperationError(`App '${appName}' was found but app page was not loaded.`);

            return success;
        });
    }

    private tryOpenAppFromMenu(driver: WebDriver, appName: string, appMenuButton: string) {
        let found = false;
        const xpathToAppMenu = AppElements.Xpath[appMenuButton];
        waitUntilClickable(driver.page, xpathToAppMenu, 5 * 1000,
            async appMenu => {
                await appMenu.click();
                found = await this.openAppFromMenu(driver, appName);
            });
        return found;
    }

    public async openAppFromMenu(driver: WebDriver, appName: string) {
        const container = await waitUntilAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.AppMenuContainer]);
        const xpathToButton = "//nav[@aria-hidden='false']//button//*[text()='[TEXT]']".replace("[TEXT]", appName);
        const button = await clickWhenAvailable(container, xpathToButton, 1 * 1000);
        const success = (button != null);

        if (!success)
            Trace.traceWarning(`App Name '${appName}' not found.`);

        return success;
    }

    private async tryToClickInAppTile(appName: string, driver: WebDriver) {
        let message = "Frame AppLandingPage is not loaded.";
        await driver.page.waitForSelector('iframe[name="AppLandingPage"]', { timeout: 30 * 1000 });
        const frame = driver.page.frame('AppLandingPage');

        let xpathToAppContainer = AppElements.Xpath[AppReference.Navigation.UCIAppContainer];
        let xpathToappTile = AppElements.Xpath[AppReference.Navigation.UCIAppTile].replaceAll("[NAME]", appName);

        let success = false;
        await waitUntilVisible(frame, xpathToAppContainer, {
            timeout: 5 * 1000,
            successCallback: async appContainer => { success = await clickWhenAvailable(appContainer, xpathToappTile, 5 * 1000) !== undefined }
        });

        if (!success)
            Trace.traceWarning(message);

        return success;
    }

    public async openGroupSubArea(group: string, subarea: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);
        return this.execute(this.getOptions("Open Group Sub Area"), async driver => {
            //Make sure the sitemap-launcher is expanded - 9.1
            if (await hasElements(driver.page, AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton])) {
                const expanded = await driver.page.$eval(AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton], e => e.getAttribute("aria-expanded").toLowerCase() == 'true');
                if (!expanded)
                    await clickWhenAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton]);
            }

            const groups = await driver.page.$$(AppElements.Xpath[AppReference.Navigation.SitemapMenuGroup]);
            const groupList = await driver.page.evaluateHandle(
                ({ groups, groupName }) => groups.find(group => group.getAttribute("aria-label").toLowerCase() == groupName),
                { groups, groupName: group.toLowerCase() });
            if (groupList == null) {
                throw new NotFoundError(`No group with the name '${group}' exists`);
            }

            const subAreaItems = await driver.page.$$(AppElements.Xpath[AppReference.Navigation.SitemapMenuItems]);
            const subAreaItem = await driver.page.evaluateHandle(
                ({ subAreaItems, subAreaName }) => subAreaItems.find(area => area.getAttribute("data-text").toLowerCase() == subAreaName),
                { subAreaItems, subAreaName: subarea.toLowerCase() });
            if (subAreaItem == null) {
                throw new NotFoundError(`No subarea with the name '${subarea}' exists inside of '${group}'`);
            }

            await subAreaItem.click();

            await this.waitForLoadArea(driver);
            return true;
        });
    }

    public async openSubArea({ area = undefined, subarea }: { area: string, subarea: string }): Promise<BrowserCommandResult<boolean>> {
        if (area) {
            return this.execute(this.getOptions("Open Sub Area"), async driver => {
                //If the subarea is already in the left hand nav, click it
                let success = await this.tryOpenSubArea(driver, subarea);
                if (!success) {
                    success = await this.tryOpenArea(area);
                    if (!success)
                        throw new InvalidOperationError(`Area with the name '${area}' not found. `);

                    success = await this.tryOpenSubArea(driver, subarea);
                    if (!success)
                        throw new InvalidOperationError(`No subarea with the name '${subarea}' exists inside of '${area}'.`);
                }

                await this.waitForLoadArea(driver);
                return true;
            });
        } else {
            return this.execute(this.getOptions("Open Unified Interface Sub-Area"), async driver => {
                let success = await this.tryOpenSubArea(driver, subarea);
                await this.waitForLoadArea(driver);
                return success;
            });
        }
    }

    private async waitForLoadArea(driver: WebDriver) {
        await waitForPageToLoad(driver.page);
        await waitForTransaction(driver.page);
    }

    private async tryOpenSubArea(driver: WebDriver, subarea: string): Promise<boolean> {
        subarea = subarea.toLowerCase();
        const navSubAreas = await this.getSubAreaMenuItems(driver);
        const element = navSubAreas[subarea];
        if (element) {
            const strSelected = await element.getAttribute("aria-selected");
            const selected = strSelected.toLowerCase() == 'true';
            if (!selected) {
                await element.click();
            }
            else {
                // This will result in navigating back to the desired subArea -- even if already selected.
                // Example: If context is an Account entity record, then a call to OpenSubArea("Sales", "Accounts"),
                // this will click on the Accounts subArea and go back to the grid view
                await element.click();
            }
        }

        return !!element;
    }

    public async openArea(subarea: string): Promise<BrowserCommandResult<boolean>> {
        return this.execute(this.getOptions("Open Unified Interface Area"), async driver => {
            let success = await this.tryOpenArea(subarea);
            await this.waitForLoadArea(driver);
            return success;
        });
    }

    private async tryOpenArea(area: string): Promise<boolean> {
        area = area.toLowerCase();
        let areas = await this.openAreas(area);

        const menuItem = areas.value[area];
        if (menuItem) {
            let strSelected = await menuItem.getAttribute("aria-checked");
            let selected = strSelected.toLowerCase() == 'true';
            if (!selected)
                menuItem.click();
        }

        return !!menuItem;
    }

    public async openAreas(area: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<Record<string, ElementHandle>>> {
        return this.execute(this.getOptions("Open Unified Interface Area"), async driver => {
            //  9.1 ?? 9.0.2 <- inverted order (fallback first) run quickly
            let areas = await this.openMenuFallback(area) ?? await this.openMenu();

            if (!(area in areas))
                throw new InvalidOperationError(`No area with the name '${area}' exists.`);

            return areas.value;
        });
    }

    public async openMenu(thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<Record<string, ElementHandle>>> {
        return this.execute(this.getOptions("Open Menu"), async driver => {
            await clickWhenAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.AreaButton]);

            let result = await this.getMenuItemsFrom(driver, AppReference.Navigation.AreaMenu);
            return result;
        });
    }

    public async openMenuFallback(area: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<Record<string, ElementHandle>>> {
        return this.execute(this.getOptions("Open Menu"), async driver => {
            //Make sure the sitemap-launcher is expanded - 9.1
            const xpathSiteMapLauncherButton = AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton];
            const launcherButton = await driver.page.$(xpathSiteMapLauncherButton);
            if (launcherButton) {
                const expanded = (await launcherButton.getAttribute("aria-expanded")).toLowerCase() === 'true';
                if (!expanded)
                    await clickWhenAvailable(driver.page, xpathSiteMapLauncherButton)
            }

            const dictionary: Record<string, ElementHandle> = {};

            //Is this the sitemap with enableunifiedinterfaceshellrefresh?
            const xpathSitemapSwitcherButton = AppElements.Xpath[AppReference.Navigation.SitemapSwitcherButton];
            const switcherButton = await driver.page.$(xpathSitemapSwitcherButton);
            if (switcherButton) {
                await switcherButton.click();
                await waitForTransaction(driver.page);

                await this.addMenuItemsFrom(driver, AppReference.Navigation.SitemapSwitcherFlyout, dictionary);
            }

            const xpathSiteMapAreaMoreButton = AppElements.Xpath[AppReference.Navigation.SiteMapAreaMoreButton];
            const moreButton = await driver.page.$(xpathSiteMapAreaMoreButton);
            if (!moreButton)
                return dictionary;

            if (await isVisible(moreButton)) {
                await moreButton.click();
                await this.addMenuItemsFrom(driver, AppReference.Navigation.AreaMoreMenu, dictionary);
            }
            else {
                const singleItem = await driver.page.$(AppElements.Xpath[AppReference.Navigation.SiteMapSingleArea].replaceAll("[NAME]", area));
                dictionary[(await singleItem.textContent()).toLowerCase()] = singleItem;
            }

            return dictionary;
        });
    }

    private async getMenuItemsFrom(driver: WebDriver, referenceToMenuItemsContainer: string): Promise<Record<string, ElementHandle>> {
        const result: Record<string, ElementHandle> = {};
        await this.addMenuItemsFrom(driver, referenceToMenuItemsContainer, result);
        return result;
    }

    private async addMenuItemsFrom(driver: WebDriver, referenceToMenuItemsContainer: string, dictionary: Record<string, ElementHandle>) {
        await waitUntilAvailable(driver.page, AppElements.Xpath[referenceToMenuItemsContainer], 2 * 2000,
            async menu => await this.addMenuItems(menu, dictionary),
            "The Main Menu is not available."
        );
    }

    private async addMenuItems(menu: ElementHandle, dictionary: Record<string, ElementHandle>) {
        let menuItems = await menu.$$('li');
        for (const item of menuItems) {
            const key = (await item.textContent()).toLowerCase();
            if (key in dictionary)
                continue;
            dictionary[key] = item;
        }
    }

    public async getSubAreaMenuItems(driver: WebDriver) {
        let dictionary: Record<string, ElementHandle> = {};

        //Sitemap without enableunifiedinterfaceshellrefresh
        let hasPinnedSitemapEntity = await hasElements(driver.page, AppElements.Xpath[AppReference.Navigation.PinnedSitemapEntity]);
        if (!hasPinnedSitemapEntity) {
            // Close SiteMap launcher since it is open
            let xpathToLauncherCloseButton = AppElements.Xpath[AppReference.Navigation.SiteMapLauncherCloseButton];
            await clickWhenAvailable(driver.page, xpathToLauncherCloseButton);
            await clickWhenAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.SiteMapLauncherButton]);

            let menuContainer = await waitUntilAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.SubAreaContainer]);

            let subItems = await menuContainer.$$('li');

            for (const subItem of subItems) {
                // Check 'Id' attribute, NULL value == Group Header
                let id = await subItem.getAttribute("id");
                if (!(id?.length > 0))
                    continue;

                // Filter out duplicate entity keys - click the first one in the list
                let key = (await subItem.textContent()).toLowerCase();
                if (!(key in dictionary))
                    dictionary[key] = subItem;
            }

            return dictionary;
        }

        //Sitemap with enableunifiedinterfaceshellrefresh enabled
        let menuShell = await driver.page.$$(AppElements.Xpath[AppReference.Navigation.SubAreaContainer]);

        //The menu is broke into multiple sections. Gather all items.
        for (const menuSection of menuShell) {
            let menuItems = await menuSection.$$(AppElements.Xpath[AppReference.Navigation.SitemapMenuItems]);
            for (const menuItem of menuItems) {
                let text = (await menuItem.textContent()).toLowerCase();
                if (!text)
                    continue;

                if (!(text in dictionary))
                    dictionary[text] = menuItem;
            }
        }

        return dictionary;
    }

    public async openSettingsOption(command: string, dataId: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        return this.execute(this.getOptions("Open " + command + " " + dataId), async ({ page }) => {
            const xpathFlyout = AppElements.Xpath[AppReference.Navigation.SettingsLauncher].replaceAll("[NAME]", command);
            const xpathToFlyoutButton = AppElements.Xpath[AppReference.Navigation.SettingsLauncherBar].replaceAll("[NAME]", command);

            let flyout = await page.$(xpathFlyout);
            if (!flyout || !(await isVisible(flyout))) {
                await clickWhenAvailable(page, xpathToFlyoutButton, constants.defaultTimeout, `No command button exists that match with: ${command}.`);
                flyout = await waitUntilVisible(page, xpathFlyout, { errorMessage: 'Flyout menu did not became visible' });
            }

            let menuItems = await flyout.$$('button');
            let button = await page.evaluateHandle(({ menuItems, dataId }) => menuItems.find(x => x.getAttribute('data-id').includes(dataId)), { menuItems, dataId });
            if (button) {
                await button.click();
                return true;
            }

            throw new InvalidOperationError(`No command with data-id: ${dataId} exists inside of the command menu ${command}`);
        });
    }

    /**
     * Opens the Guided Help
     * @param thinkTime Used to simulate a wait time between human interactions. The Default is 2 seconds.
     */
    public async openGuidedHelp(thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);

        return this.execute(this.getOptions("Open Guided Help"), async driver => {
            clickWhenAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.GuidedHelp]);

            return true;
        });
    }

    /**
     * Opens the Admin Portal
     * @param thinkTime Used to simulate a wait time between human interactions. The Default is 2 seconds.
     */
    public async openAdminPortal(thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);
        return this.execute(this.getOptions("Open Admin Portal"), async driver => {
            await waitUntilVisible(driver.page, AppElements.Xpath[AppReference.Application.Shell]);
            // TODO:
            await (await driver.page.$(AppElements.Xpath[AppReference.Navigation.AdminPortal]))?.click();
            await (await driver.page.$(AppElements.Xpath[AppReference.Navigation.AdminPortalButton]))?.click();
            return true;
        });
    }

    /**
     * Open Global Search
     * @param thinkTime Used to simulate a wait time between human interactions. The Default is 2 seconds.
     */
    public async openGlobalSearch(thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);

        return this.execute(this.getOptions("Open Global Search"), async driver => {
            await waitUntilClickable(driver.page, AppElements.Xpath[AppReference.Navigation.SearchButton],
                5 * 1000,
                async d => {
                    await clickWhenAvailable(driver.page, AppElements.Xpath[AppReference.Navigation.SearchButton]);
                },
                "The Global Search button is not available."
            );
            return true;
        });
    }

    public async clickQuickLaunchButton(toolTip: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);

        return this.execute(this.getOptions(`Quick Launch: ${toolTip}`), async driver => {
            await waitUntilClickable(driver.page, AppElements.Xpath[AppReference.Navigation.QuickLaunchMenu]);

            //Text could be in the crumb bar.  Find the Quick launch bar buttons and click that one.
            let buttons = await driver.page.$(AppElements.Xpath[AppReference.Navigation.QuickLaunchMenu]);
            let launchButton = await buttons.$(AppElements.Xpath[AppReference.Navigation.QuickLaunchButton].replaceAll("[NAME]", toolTip));
            await launchButton.click();

            return true;
        });
    }

    public async quickCreate(entityName: string, thinkTime = constants.defaultThinkTime): Promise<BrowserCommandResult<boolean>> {
        await this.thinkTime(thinkTime);

        return this.execute(this.getOptions(`Quick Create: ${entityName}`), async ({ page }) => {
            //Click the + button in the ribbon
            const quickCreateButton = await page.$(AppElements.Xpath[AppReference.Navigation.QuickCreateButton]);
            quickCreateButton.click();

            //Find the entity name in the list
            let entityMenuList = await page.$(AppElements.Xpath[AppReference.Navigation.QuickCreateMenuList]);
            let entityMenuItems = await entityMenuList.$$(AppElements.Xpath[AppReference.Navigation.QuickCreateMenuItems]);
            let entityButton = await page.evaluateHandle(({ entityMenuItems, entityName }) => entityMenuItems.find(e => e.textContent.toLowerCase().includes(entityName.toLowerCase())),
                { entityMenuItems, entityName });

            if (!entityButton)
                throw new NotFoundError(`${entityName} not found in Quick Create list.`);

            //Click the entity name
            entityButton.click();

            await waitForTransaction(page);

            return true;
        });
    }

    // #endregion


    private thinkTime(milliseconds: number) {
        return this.browser.thinkTime(milliseconds);
    }
}