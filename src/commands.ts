import { Browser } from "playwright";
import * as constants from './constants';
import { WebDriver } from './abstraction';

export interface CommandResult {

    commandName: string;

    executionAttempts: number;

    startTime: Date;

    error: Error;

    success: boolean;

    stopTime: Date;

    executionTime: number;

    transitionTime: number;

    thinkTime: number;

    depth: number;
}

export class BrowserCommandResult<TReturn> implements CommandResult {

    constructor(public value: TReturn = undefined) {
        this.executionAttempts = 0;
    }

    commandName: string;
    executionAttempts: number;
    startTime: Date;
    error: Error;
    success: boolean;
    stopTime: Date;
    get executionTime(): number {
        if (this.startTime && this.stopTime) {
            return this.stopTime.getTime() - this.startTime.getTime();
        }

        return 0;
    }
    transitionTime: number;
    thinkTime: number;
    depth: number;

    public start() {
        this.startTime = new Date();
    }

    public stop() {
        if (!this.startTime) {
            throw new Error("Stop cannot be invoked because start was never called.");
        }

        this.stopTime = new Date();
    }
}

export class BrowserCommandOptions {
    public static readonly default = new BrowserCommandOptions();
    public static readonly noRetry = new BrowserCommandOptions();
    public static readonly infiniteRetry = new BrowserCommandOptions();

    public readonly errorTypes: Error[];

    constructor(
        public traceSource = constants.defaultTraceSource,
        public commandName = "",
        public retryAttempts = constants.defaultRetryAttempts,
        public retryDelay = constants.defaultRetryDelay,
        public errorAction = null,
        public throwErrors = true,
        ...errors: Error[]
    ) {
        this.errorTypes = errors;
    }
}

export abstract class BrowserCommand<TReturn> {

    constructor(private readonly options: BrowserCommandOptions) {
    }

    public async execute(driver: WebDriver, ...params): Promise<BrowserCommandResult<TReturn>> {
        let retries = this.options.retryAttempts;
        var result = new BrowserCommandResult<TReturn>();
        result.commandName = this.options.commandName;

        // TODO:
        // System.Diagnostics.Trace.CorrelationManager.StartLogicalOperation();

        result.start();

        while (retries-- >= 0) {
            try {
                result.executionAttempts++;

                // TODO: use debug
                /*
                Trace.TraceEvent(TraceEventType.Information,
                    Constants.Tracing.CommandStartEventId,
                    "Command Start: {0} - Attempt {1}/{2}",
                    this.Options.CommandName,
                    result.ExecutionAttempts,
                    this.Options.RetryAttempts);
                */

                result.value = await this.executeCommand(driver, ...params);
                result.success = true;
            }
            catch (e) {
                result.success = false;
                result.error = e;

                if (this.options.errorTypes?.length > 0) {
                    var isAssignable = this.options.errorTypes
                        .some(t => e.name === t.name);

                    if (!isAssignable || retries == 0) {
                        // TODO: use debug
                        /*
                        Trace.TraceEvent(TraceEventType.Error,
                            Constants.Tracing.CommandErrorEventId,
                            "Command Error: {0} - Attempt {1}/{2} - {3} - {4}",
                            this.Options.CommandName,
                            result.ExecutionAttempts,
                            this.Options.RetryAttempts,
                            e.GetType().FullName, e.Message);
                        */

                        if (this.options.throwErrors) {
                            throw e;
                        }
                    }
                    else {
                        if (this.options.errorAction != null) {
                            // TODO: use debug
                            /*
                            Trace.TraceEvent(TraceEventType.Information,
                                Constants.Tracing.CommandRetryEventId,
                                "Command Error: {0} - Retry Action initiated",
                                this.Options.CommandName);
                            */
                            this.options.errorAction(e);
                        }

                        if (this.options.retryDelay > 0)
                            await setTimeout.__promisify__(this.options.retryDelay);
                    }
                }
                else {
                    // TODO: use debug
                    /*
                    Trace.TraceEvent(TraceEventType.Error,
                        Constants.Tracing.CommandErrorEventId,
                        "Command Error: {0} - Attempt {1}/{2} - {3} - {4}",
                        this.Options.CommandName,
                        result.ExecutionAttempts,
                        this.Options.RetryAttempts,
                        e.GetType().FullName, e.Message);
                    */

                    if (this.options.throwErrors) {
                        throw e;
                    }
                }
            }
            finally {
                if (result.success === true) {
                    retries = -1;
                }
            }
        }

        result.stop();

        // TODO: use debug
        /*
        Trace.TraceEvent(TraceEventType.Information,
            Constants.Tracing.CommandStopEventId,
            "Command Stop: {0} - {1} attempts - total execution time {2}ms",
            this.Options.CommandName,
            result.ExecutionAttempts,
            result.ExecutionTime);
        */
        // TODO: use debug
        //System.Diagnostics.Trace.CorrelationManager.StopLogicalOperation();

        return result;
    }

    protected abstract executeCommand(driver: WebDriver, ...params): Promise<TReturn>;
}

export class DelegateBrowserCommand<TReturn> extends BrowserCommand<TReturn> {

    constructor(options: BrowserCommandOptions, private readonly delegate: (driver: WebDriver, ...params: any) => Promise<TReturn>) {
        super(options);
    }

    protected executeCommand(driver: WebDriver, ...params: any[]): Promise<TReturn> {
        return this.delegate(driver, ...params);
    }
}