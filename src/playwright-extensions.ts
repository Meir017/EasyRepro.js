import { ElementHandle, Frame, Page } from 'playwright';
import * as constants from './constants';
import { InvalidOperationError } from './errors';

export async function hasElements(page: Page, selector: string) {
    const elements = await page.$$(selector);
    return elements.length > 0;
}

export async function waitForPageToLoad(page: Page, timeout = constants.defaultTimeout) {
    let complete: boolean;
    let error;
    try {
        await page.waitForLoadState("domcontentloaded");
        complete = true;
    } catch (e) {
        error = e;
        complete = false;
    }

    if (!complete) {
        const state = await page.evaluate(() => document.readyState);
        if (state === 'interactive') {
            throw error;
        }
    }

    return true;
}

export async function waitForTransaction(page: Page, timeout = constants.defaultTimeout) {
    try {
        await page.waitForFunction('window.UCWorkBlockTracker.isAppIdle()'); // Check to see if UCI is idle
    } catch {
        return false;
    }
}

export async function clickWhenAvailable(context: Page | Frame | ElementHandle, selector: string, timeout = constants.defaultTimeout, errorMessage = undefined) {
    return waitUntilClickable(context, selector, timeout, e => e.click(), errorMessage ?? 'Unable to click element.');
}

export async function waitUntilAvailable(context: Page | Frame | ElementHandle, selector: string, timeout = constants.defaultTimeout, successCallback: (element: ElementHandle) => Promise<void> = undefined, failureCallback = undefined) {
    try {
        const element = await context.waitForSelector(selector, { state: 'visible', timeout });
        successCallback && await successCallback(element);
        return element;
    } catch (error) {
        failureCallback && failureCallback();
    }
}

export async function clickIfVisible(context: Page | Frame | ElementHandle, selector: string, timeout: number = undefined) {
    return waitUntilClickable(context, selector, timeout || 1000, e => e.click());
}

export async function waitUntilClickable(context: Page | Frame | ElementHandle, selector: string, timeout: number = undefined, successCallback: (element: ElementHandle) => Promise<void> = undefined, errorMessage = undefined) {
    if (!errorMessage) {
        errorMessage = `Unable to find any clickable element by: ${selector}`;
    }
    try {
        const element = await context.waitForSelector(selector, { state: 'visible', timeout });
        successCallback && await successCallback(element);
        return element;
    } catch (error) {
        throw new InvalidOperationError(errorMessage);
    }
}

type WaitUntilOptions = Partial<{
    timeout: number;
    successCallback: (element: ElementHandle) => Promise<void>;
    failureCallback: Function;
    errorMessage: string;
}>;

// { failureCallback = undefined, successCallback = undefined, timeout = undefined, errorMessage = undefined }: { timeout: number, successCallback: (element: ElementHandle) => Promise<void>, failureCallback: Function, errorMessage: string }

export async function waitUntilVisible(context: Page | Frame | ElementHandle, selector: string, { timeout = undefined, successCallback = undefined, failureCallback = undefined, errorMessage = undefined }: WaitUntilOptions = {}) {
    try {
        const element = await context.waitForSelector(selector, { state: 'visible', timeout });
        successCallback && await successCallback(element);
        return element;
    } catch (error) {
        if (errorMessage && !failureCallback) {
            errorMessage = `Unable to find any visible element by: ${selector}`;
            failureCallback = () => { throw new InvalidOperationError(errorMessage); };
        }

        failureCallback && failureCallback();
    }
}

/**
 * based on playwright's InjectedScript.isVisible
 */
export async function isVisible(context: ElementHandle<HTMLElement | SVGElement>) {
    return context.evaluate(element => {
        if (!element.ownerDocument || !element.ownerDocument.defaultView)
            return true;
        const style = element.ownerDocument.defaultView.getComputedStyle(element);
        if (!style || style.visibility === 'hidden')
            return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    });
}