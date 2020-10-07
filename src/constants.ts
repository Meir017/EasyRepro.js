

/**
 * The default amount of time to wait for an operation to complete by the Selenium driver.
 */
export const defaultTimeout = 30 * 1000;

/**
 * The default amount of time to wait between retrying command executions if they fail.
 * Value is expressed in milliseconds.
 */
export const defaultRetryDelay = 5000;

/**
* The default number of retry attempts for a command execution if it fails.
*/
export const defaultRetryAttempts = 2;

/**
 * The default page to direct a user to if none other is specified.
 */
export const defaultLoginUri = "https://portal.office.com";

/**
 * The default tracing source for browser automation.
 */
export const defaultTraceSource = "BrowserAutomation";

/**
 * The default tracing source for browser automation.
 */
export const defaultThinkTime = 2000;

/**
 * Constants and defaults related to the InteractiveBrowser.
 */
export const browser = {
    IESettingsRegistryHive: "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Main",
    IESettingsTabProcGrowthKey: "TabProcGrowth",
    Recording: {
        GetRecordedEventsCommand: "return Recorder.getEvents();",
        GlobalEventCollectionScript: "document.eventCollection = new Array();",
        CheckIfScriptExistsScript: "return typeof Recorder === 'undefined'? 'false' : 'true';",
        CheckIfEventCollectionExistsScript: "return typeof document.eventCollection  === 'undefined'? 'false' : 'true';",
        RemoveEventsScript: "if (typeof Recorder !== undefined) { Recorder.removeEvents({0}); }",
        /**
         * The default scan interval.
         */
        defaultScanInterval: 250
    }
};

export const Tracing = {
    /* InteractiveBrowser */
    BrowserEventFiringEventId: 9000,
    BrowserEventFiredEventId: 9001,

    BrowserElementClickedEventId: 9011,
    BrowserElementClickingEventId: 9010,
    BrowserElementValueChangedEventId: 9013,
    BrowserElementValueChangingEventId: 9012,
    BrowserExceptionThrownEventId: 9050,
    BrowserFindElementCompletedEventId: 9015,
    BrowserFindingElementEventId: 9014,
    BrowserNavigatedEventId: 9021,
    BrowserNavigatedBackEventId: 9023,
    BrowserNavigatedForwardEventId: 9025,
    BrowserNavigatingEventId: 9020,
    BrowserNavigatingBackEventId: 9022,
    BrowserNavigatingForwardEventId: 9024,
    BrowserScriptExecutedEventId: 9031,
    BrowserScriptExecutingEventId: 9030,

    /* Commands */
    CommandStartEventId: 10001,
    CommandStopEventId: 10002,
    CommandErrorEventId: 10003,
    CommandRetryEventId: 10004,
}

export const Xrm = {
    XrmDomains: [
        ".crm.dynamics.com",
        ".crm2.dynamics.com",
        ".crm3.dynamics.com",
        ".crm4.dynamics.com",
        "crm5.dynamics.com",
        "crm6.dynamics.com",
        "crm7.dynamics.com",
        ".crm8.dynamics.com",
        ".crm9.dynamics.com",
        ".crm10.dynamics.com",
        ".crm11.dynamics.com",
        ".crm12.dynamics.com",
        ".crm15.dynamics.com",
        "portal.office.com",
        "crm2.crmlivetie.com",
        ".crm.microsoftdynamics.us",
        "portal.office365.us"
    ]
}