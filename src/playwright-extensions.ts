import { ElementHandle, Page } from 'playwright';
import * as constants from './constants';

export async function hasElements(page: Page, selector: string) {
    const elements = await page.$$(selector);
    return elements.length > 0;
}

export async function waitForTransaction(page: Page, timeout = constants.defaultTimeout) {
    try {
        await page.waitForFunction('window.UCWorkBlockTracker.isAppIdle()'); // Check to see if UCI is idle
    } catch {
        return false;
    }
}

export async function waitUntilAvailable(page: Page, selector: string, timeout = constants.defaultTimeout, successCallback = undefined, failureCallback = undefined) {
    try {
        const element = await page.waitForSelector(selector, { state: 'visible' });
        successCallback && await successCallback(element);
        return element;
    } catch (error) {
        failureCallback && failureCallback();
    }
}

export async function clickIfVisible(page: Page, selector: string, timeout: number = undefined) {
    return waitUntilClickable(page, selector, timeout || 1000, e => e.click());
}

export async function waitUntilClickable(page: Page, selector: string, timeout: number = undefined, successCallback: (element: ElementHandle) => Promise<void> = undefined, failureCallback = undefined) {
    try {
        const element = await page.waitForSelector(selector, { state: 'visible', timeout });
        successCallback && await successCallback(element);
        return element;
    } catch (error) {
        failureCallback && failureCallback();
    }
}