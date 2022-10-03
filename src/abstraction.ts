import { Browser, BrowserContext, Page } from '@playwright/test';

export interface WebDriver {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}