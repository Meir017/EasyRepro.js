import { Browser, BrowserContext, Page } from "playwright";

export interface WebDriver {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}