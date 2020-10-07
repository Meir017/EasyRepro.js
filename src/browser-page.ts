import { BrowserCommand, BrowserCommandOptions, BrowserCommandResult, DelegateBrowserCommand } from './commands';
import { InteractiveBrowser } from './interactive-browser';
import * as constants from './constants';
import { WebDriver } from './abstraction';

export class BrowserPage {

    constructor(readonly browser: InteractiveBrowser) {
    }

    async execute<TResult, TParams extends any[]>(cmd: (BrowserCommand<TResult>) | BrowserCommandOptions | string, delegate: (driver: WebDriver, ...params: TParams) => Promise<TResult>, ...params: TParams): Promise<BrowserCommandResult<TResult>> {
        this.browser.depth++;

        let command: BrowserCommandResult<TResult>;
        if (cmd instanceof BrowserCommand) {
            command = await cmd.execute(this.browser);
        } else if (cmd instanceof BrowserCommandOptions) {
            command = await new DelegateBrowserCommand(cmd, delegate).execute(this.browser, ...params);
        } else if (typeof cmd === 'string') {
            command = await new DelegateBrowserCommand(new BrowserCommandOptions(constants.defaultTraceSource, cmd), delegate).execute(this.browser, ...params);
        }

        this.browser.calculateResults(command);
        this.browser.depth--;
        return command;
    }
}