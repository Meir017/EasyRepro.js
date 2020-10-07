import { Browser, BrowserContext, Page } from "playwright";
import { BrowserPage } from "./browser-page";
import { CommandResult } from "./commands";
import * as constants from "./constants";
import * as path from 'path';

export class BrowserCredentials {
    public static readonly default = new BrowserCredentials();

    constructor(public readonly username: string = undefined, public readonly password: string = undefined) { }
}

export class BrowserOptions {

    public DriversPath = path.join(process.cwd()); //, @"Drivers\");
    public DownloadsPath: string = null;

    public PageLoadTimeout = 3 * 60 * 1000;
    public CommandTimeout = 10 * 60 * 1000;
    public StartMaximized = true;
    public FireEvents = false;
    public TraceSource = constants.defaultTraceSource;
    public EnableRecording = false;
    public RecordingScanInterval = constants.browser.Recording.defaultScanInterval;
    public Credentials = BrowserCredentials.default;
    public HideDiagnosticWindow = true;
    public Height: number = null;
    public Width: number = null;
    public UCITestMode = true;
    public UCIPerformanceMode = false;
    public AppInsightsKey = '';
    public DisableExtensions = false;
    public DisableFeatures = false;
    public DisablePopupBlocking = false;
    public DisableSettingsWindow = false;
    public EnableJavascript = false;
    public NoSandbox = false;
    public DisableGpu = false;
    public DumpDom = false;
    public EnableAutomation = false;
    public DisableImplSidePainting = false;
    public DisableDevShmUsage = false;
    public DisableInfoBars = false;
    public Headless = false;
    public TestTypeBrowser = false;
}

export class InteractiveBrowser {

    private options: BrowserOptions;
    public readonly browser: Browser;
    public context: BrowserContext;
    public page: Page;

    public depth = 0;
    private lastCommandEndTime: Date;
    private commandThinkTimes: { [depth: number]: number } = {};
    private totalThinkTime: number = 0;
    private commandResults: CommandResult[] = [];

    constructor(arg: BrowserOptions | Browser) {
        if (arg instanceof BrowserOptions) {
            this.options = arg;
        } else {
            this.browser = arg;
        }
    }

    public async init() {
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    public get isRecording(): boolean {
        throw new Error("not implemented");
    }

    dispose() {
        throw new Error("not implemented");
    }
    getPage<T extends BrowserPage>(): BrowserPage {
        return undefined;
    }

    navigate(operation: NavigationOperation | String) {
        throw new Error("not implemented");
    }

    takeWindowScreenShot(path: string, fileFormat: ScreenshotImageFormat) {
        throw new Error("not implemented");
    }
    async thinkTime(milliseconds: number) {
        if (!(this.depth in this.commandThinkTimes))
            this.commandThinkTimes[this.depth] = milliseconds;
        else if (this.depth == 1)
            this.commandThinkTimes[this.depth] += milliseconds;
        else
            this.commandThinkTimes[this.depth] = milliseconds;

        this.totalThinkTime += milliseconds;
        await this.page.waitForTimeout(milliseconds);
    }

    calculateResults(result: CommandResult) {
        if (this.depth === 1) {
            if (result.startTime && this.lastCommandEndTime && this.depth === 1) {
                result.transitionTime = Math.floor((result.startTime.getTime() - this.lastCommandEndTime.getTime()) / 1000) * 1000 + (result.startTime.getTime() - this.lastCommandEndTime.getTime() - this.commandThinkTimes[this.depth]);
            }
            this.lastCommandEndTime = result.stopTime;
        }

        result.thinkTime = this.commandThinkTimes[this.depth] || 0;
        result.depth = this.depth;
        this.commandResults.push(result);
        this.commandThinkTimes[this.depth] = 0;
    }
}

enum ScreenshotImageFormat {

}

interface NavigationOperation {

}