import { BrowserPage } from './browser-page';
import { BrowserCommandOptions, BrowserCommandResult } from './commands';
import { BrowserOptions, InteractiveBrowser } from './interactive-browser';
import * as constants from './constants';
import { ElementHandle, Page } from 'playwright';
import { clickIfVisible, hasElements, waitForTransaction, waitUntilAvailable } from './playwright-extensions';
import { Elements, Reference } from './element-reference';

enum LoginResult {
    Success,
    Failure,
    Redirect
}

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

            var uri = page.url();
            var queryParams = "&flags=easyreproautomation=true";

            // TODO:
            // if (Browser.Options.UCITestMode) queryParams += ",testmode=true";
            // if (Browser.Options.UCIPerformanceMode) queryParams += "&perf=true";

            if (!uri.includes(queryParams) && !uri.includes(encodeURIComponent(queryParams))) {
                var testModeUri = uri + queryParams;

                await page.goto(testModeUri);
            }

            // Again wait for loading
            await this.waitForMainPage();

            return true;
        });
    }

    async waitForMainPage(timeout: number | undefined = undefined, successCallback: (element: ElementHandle) => Promise<void> = undefined, failureCallback = undefined) {
        timeout = timeout ?? constants.defaultTimeout;
        successCallback = successCallback ?? (
            async e => {
                const isUCI = await hasElements(this.page, Elements.Xpath[Reference.Login.CrmUCIMainPage]);
                if (isUCI)
                    await waitForTransaction(this.page);
            });

        var xpathToMainPage = Elements.Xpath[Reference.Login.CrmMainPage];
        var element = await waitUntilAvailable(this.page, xpathToMainPage, timeout, successCallback, failureCallback);
        return element != null;
    }

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
                var isUserAlreadyLogged = await this.isUserAlreadyLogged();
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
                // TODO: throw InvalidOperationException
                throw new Error("Something went wrong entering the OTC. Please check the MFA-SecretKey in configuration.");

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

        var totp = new Totp(base32Bytes);
        var result = totp.ComputeTotp(); // <- got 2FA coed at this time!
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
                // TODO: throw InvalidOperationException
                throw new Error("The application is wait for the OTC but your MFA-SecretKey is not set. Please check your configuration.");

            var oneTimeCode = this.generateOneTimeCode(mfaSecretKey);
            // TODO:
            // SetInputValue(page, input, oneTimeCode, 1 * 1000);
            // input.Submit();
            return true; // input found & code was entered
        }
        catch (e) {
            const message = `An Error occur entering OTC. Exception: ${e.message}`;
            // TODO:
            // Trace.TraceInformation(message);
            // TODO: throw InvalidOperationException
            throw new Error(message);
        }
    }

    private getOtcInput(page: Page) {
        return waitUntilAvailable(page, Elements.Xpath[Reference.Login.OneTimeCode], 2 * 1000);
    }

    private async clickStaySignedIn(page: Page) {
        var xpath = Elements.Xpath[Reference.Login.StaySignedIn];
        var element = await clickIfVisible(page, xpath, 5 * 1000);
        return element != null;
    }

    private thinkTime(milliseconds: number) {
        return this.browser.thinkTime(milliseconds);
    }
}