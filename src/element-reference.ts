
export const Elements = {
    Xpath: {
        //Business Process Flow
        "BPF_NextStage": "id(\"stageAdvanceActionContainer\")/div",
        "BPF_PreviousStage": "id(\"stageBackActionContainer\")/div",
        "BPF_Hide": "id(\"processControlCollapseButton\")",
        "BPF_SetActive": "id(\"stageSetActiveActionContainer\")",
        "BPF_SelectStage": "id(\"stage_[STAGENUM]\")/div[2]/div/div/div/span",
        "BPF_Ok": "id(\"SwitchProcess-Select\")",

        //Dialogs
        "Dialog_Header": "id(\"dialogHeaderTitle\")",
        "Dialog_DeleteHeader": "id(\"tdDialogHeader\")",
        "Dialog_WorkflowHeader": "id(\"DlgHdContainer\")",
        "Dialog_ProcessFlowHeader": "id(\"processSwitcherFlyout\")",
        "Dialog_CloseOpportunityOk": "id(\"ok_id\")",
        "Dialog_AssignOk": "id(\"ok_id\")",
        "Dialog_DeleteOk": "id(\"butBegin\")",
        "Dialog_DuplicateOk": "id(\"butBegin\")",
        "Dialog_DuplicateCancel": "id(\"cmdDialogCancel\")",
        "Dialog_ConfirmWorkflow": "id(\"butBegin\")",
        "Dialog_ConfirmReport": "id(\"butBegin\")",
        "Dialog_AllRecords": "id(\"reportDefault\")",
        "Dialog_SelectedRecords": "id(\"reportSelected\")",
        "Dialog_ViewRecords": "id(\"reportView\")",
        "Dialog_AddUserHeader": "id(\"addUserDescription\")",
        "Dialog_AddUser": "id(\"buttonNext\")",
        "Dialog_AddConnectionHeader": "id(\"EntityTemplateTab.connection.NoRelationship.Form.Mscrm.Form.connection.MainTab-title\")",
        "Dialog_AddConnectionSave": "id(\"connection|NoRelationship|Form|Mscrm.Form.connection.SaveAndClose-Large\")",
        "Dialog_RoleLookupButton": "id(\"record2roleid\")",
        "Dialog_RoleLookupTable": "id(\"record2roleid_IMenu\")",
        "Dialog_WarningFooter": "//*[@id=\"crmDialogFooter\"]",
        "Dialog_WarningCloseButton": "//*[@id=\"butBegin\"]",


        //GuidedHelp
        "GuidedHelp_MarsOverlay": "id(\"marsOverlay\")",
        "GuidedHelp_ButBegin": "id(\"butBegin\")",
        "GuidedHelp_ButtonClose": "id(\"buttonClose\")",


        //Frames
        "Frame_ContentPanel": "id(\"crmContentPanel\")",
        "Frame_ContentFrame": "id(\"currentcontentid\")",
        "Frame_DialogFrame": "id(\"InlineDialog[INDEX]\")",
        "Frame_QuickCreateFrame": "id(\"globalquickcreate_container_NavBarGloablQuickCreate\")",
        "Frame_WizardFrame": "id(\"wizardpageframe\")",

        //Navigation
        "Nav_ActionGroup": "id(\"actionGroupControl\")",
        "Nav_SubActionGroup": "id(\"actionGroupControl\")",
        "Nav_SubActionGroupContainer": "id(\"detailActionGroupControl\")",
        "Nav_GuidedHelp": "id(\"TabButtonHelpId\")/a",
        "Nav_AdminPortal": "id(\"TabAppSwitcherNode\")/a",
        "Nav_Settings": "id(\"TabButtonSettingsId\")/a",
        "Nav_Options": "id(\"navTabButtonSettingsOptionsId\")",
        "Nav_PrintPreview": "id(\"navTabButtonSettingsPrintPreviewId\")",
        "Nav_AppsForCrm": "id(\"navTabButtonSettingsNavAppsForCrmId\")",
        "Nav_WelcomeScreen": "id(\"navTabButtonSettingsNavTourId\")",
        "Nav_About": "id(\"navTabButtonSettingsAboutId\")",
        "Nav_OptOutLP": "id(\"navTabButtonSettingsGuidedHelpId\")",
        "Nav_Privacy": "id(\"NodeSettingsPrivacyStatementId\")",
        "Nav_UserInfo": "id(\"navTabButtonUserInfoLinkId\")",
        "Nav_SignOut": "id(\"navTabButtonUserInfoSignOutId\")",
        "Nav_TabGlobalMruNode": "id(\"TabGlobalMruNode\")",
        "Nav_GlobalCreate": "id(\"navTabGlobalCreateImage\")",
        "Nav_AdvFindSearch": "id(\"AdvFindSearch\")",
        "Nav_Shuffle": "id(\"nav-shuffle\")",
        "Nav_TabNode": "id(\"TabNode_tab0Tab\")",
        "Nav_TabSearch": "id(\"TabSearch\")",
        "Nav_SearchButton": "id(\"SearchNode\")/a",
        "Nav_SearchLabel": "id(\"findHintText\")",
        "Nav_Search": "id(\"search\")",
        "Nav_StartSearch": "id(\"findCriteriaButton\")",

        "Nav_Tab_Summary": "//li[contains(@data-id,\"tablist-SUMMARY_TAB\")]",
        "Nav_Tab_Details": "//li[contains(@data-id,\"tablist-DETAILS_TAB\")]",
        "Nav_Tab_Perf": "//li[contains(@data-id,\"tablist-tab_perf\")]",

        //Grid
        "Grid_JumpBar": "id(\"crmGrid_JumpBar\")",
        "Grid_ShowAll": "id(\"crmGrid_JumpBar\")/tbody/tr/td[1]",
        "Grid_RowSelect": "id(\"gridBodyTable\")/tbody/tr[[INDEX]]/td[1]",
        "Grid_Filter": "id(\"filterButtonLink\")",
        "Grid_ChartList": "id(\"visualizationListLink\")",
        "Grid_ChartDialog": "id(\"Dialog_1\")",
        "Grid_ToggleSelectAll": "id(\"crmGrid_gridBodyTable_checkBox_Image_All\")",
        "Grid_FirstPage": "id(\"fastRewind\")",
        "Grid_NextPage": "id(\"_nextPageImg\")",
        "Grid_PreviousPage": "id(\"_prevPageImg\")",
        "Grid_FindCriteriaImg": "id(\"crmGrid_findCriteriaButton\")",
        "Grid_FindCriteria": "id(\"crmGrid_findCriteria\")",
        "Grid_GridBodyTable": "id(\"gridBodyTable\")",
        "Grid_DefaultViewIcon": "id(\"defaultViewIcon\")",
        "Grid_ViewSelector": "id(\"crmGrid_SavedNewQuerySelector\")",
        "Grid_Refresh": "id(\"grid_refresh\")",
        "Grid_ViewSelectorContainer": "id(\"viewSelectorContainer\")",
        "Grid_FirstRow": "id(\"gridBodyTable\")/tbody/tr[1]",

        //Entity
        "Entity_Form": "//*[contains(@id, \"tablist\")]",
        "Entity_Close": "id(\"closeButton\")",
        "Entity_Save": "id(\"savefooter_statuscontrol\")",
        "Entity_FormSelector": "//*[@data-id=\"form-selector\"]",
        "Entity_FormSelectorFlyout": "//*[@data-id=\"form-selector-flyout\"]",
        "Entity_FormSelectorItem": "//li[contains(@data-id, 'form-selector-item')]",

        //Related MenuItems
        "Related_Popout": "//li[contains(@data-id,\"tablist-tab_related\")]",
        "Related_Common_Activities": "//div[contains(@data-id,\"form-tab-relatedEntity-navActivities\")]",

        //Timeline
        "Timeline_Add_Popout": "//button[contains(@id,\"notescontrol-action_bar_add_command\")]",
        "Timeline_Add_Popout_Appointment": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_appointment\")]",
        "Timeline_Add_Popout_Email": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_email\")]",
        "Timeline_Add_Popout_PhoneCall": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_phonecall\")]",
        "Timeline_Add_Popout_Task": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_task\")]",
        "Timeline_Add_Popout_Note": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_notes\")]",
        "Timeline_Add_Popout_Post": "//li[contains(@id,\"notescontrol-createNewRecord_flyoutMenuItem_post\")]",

        "Timeline_Post_Text": "id(\"create_post_postText\")",
        "Timeline_Post_Add": "id(\"create_post_add_btn\")",
        "Timeline_Post_Cancel": "id(\"create_post_cancel_btn\")",

        "Timeline_Note_Title": "id(\"create_note_medium_title\")",
        "Timeline_Note_Text": "//iframe[contains(@class, \"fullPageContentEditorFrame\")]",
        "Timeline_Note_TextBody": "//body[contains(@class, 'cke_wysiwyg_frame')]",
        "Timeline_Note_Add": "id(\"create_note_add_btn\")",
        "Timeline_Note_Cancel": "id(\"create_note_cancel_btn\")",

        //Global Search
        "Search_Filter": "id(\"filterCombo\")",
        "Search_Text": "id(\"searchTextBox\")",
        "Search_Button": "id(\"SearchButton\")",
        "Search_Result": "id(\"entityDiv_1\")",
        "Search_Container": "id(\"panoramaContainer\")",

        //DashBoard
        "DashBoard_Selector": "id(\"dashboardSelector\")",

        //CommandBar
        "CommandBar_RibbonManager": "id(\"crmRibbonManager\")",
        "CommandBar_List": "id(\"moreCommandsList\")",
        "CommandBar_MoreCommands": "id(\"moreCommands\")",

        //ActivityFeed
        "Notes_NotesControl": "id(\"notescontrol\")",
        "Notes_NotesWall": "id(\"notesWall\")",
        "Notes_NotesText": "id(\"createNote_notesTextBox\")",
        "Notes_PostWall": "id(\"activityFeedsWall\")",
        "Notes_PostButton": "id(\"postButton\")",
        "Notes_PostText": "id(\"postTextBox\")",
        "Notes_ActivityWall": "id(\"notescontrolactivityContainer_notescontrol\")",
        "Notes_ActivityStatusFilter": "id(\"activityWallFilterButton\")",
        "Notes_ActivityStatusFilterDialog": "id(\"moreActivitiesList\")",
        "Notes_ActivityStatusAll": "id(\"AllActivitiesButton\")",
        "Notes_ActivityStatusOpen": "id(\"OpenActivitiesButton\")",
        "Notes_ActivityStatusOverdue": "id(\"OverdueActivitiesButton\")",
        "Notes_ActivityAssociatedView": "id(\"OpenAssociatedGridView\")",
        "Notes_ActivityPhoneCallOk": "id(\"save4210QuickCreateButton\")",
        "Notes_ActivityTaskOk": "id(\"save4212QuickCreateButton\")",
        "Notes_ActivityMoreActivities": "id(\"moreActivitiesButton\")",
        "Notes_ActivityAddEmail": "id(\"AddemailButton\")",
        "Notes_ActivityAddAppointment": "id(\"AddappointmentButton\")",
        "Notes_ActivityAddPhoneCall": "id(\"activityLabelinlineactivitybar4210\")",
        "Notes_ActivityAddTask": "id(\"activityLabelinlineactivitybar4212\")",
        "Notes_Done": "id(\"doneSpacer\")",
        "Notes_VoiceMail": "id(\"PhoneCallQuickformleftvoiceCheckBoxContol\")",
        "Notes_ActivityTaskScheduledEnd": "id(\"quickCreateActivity4212controlId_scheduledend\")",
        "Notes_ActivityAddTaskDueTime": "id(\"selectTable_Date\")",

        //Login           
        "Login_UserId": "//input[@type='email']",
        "Login_Password": "//input[@type='password']",
        "Login_SignIn": "id(\"cred_sign_in_button\")",
        "Login_CrmMainPage": "//*[contains(@id,'crmTopBar') or contains(@data-id,'topBar')]",
        "Login_CrmUCIMainPage": "//*[contains(@data-id,'topBar')]",
        "Login_StaySignedIn": "//input[@id=\"idSIButton9\"]",
        "Login_OneTimeCode": "//input[@name='otc']",


        //Notification           
        "Notification_AppMessageBar": "id(\"crmAppMessageBar\")",
        "Notification_Close": "id(\"crmAppMessageBarCloseButton\")",

        //Office365Navigation           
        "Office365Navigation_NavMenu": "id(\"TabAppSwitcherNode\")",

        //QuickCreate           
        "QuickCreate_Cancel": "id(\"globalquickcreate_cancel_button_NavBarGloablQuickCreate\")",
        "QuickCreate_Save": "id(\"globalquickcreate_save_button_NavBarGloablQuickCreate\")",
        "QuickCreate_EnittyContainer": "id(\"actionGroupControl\")",


        //LookUp
        "LookUp_SelObjects": "id(\"selObjects\")",
        "LookUp_SavedQuerySelector": "id(\"crmGrid_SavedQuerySelector\")",
        "LookUp_DialogCancel": "id(\"cmdDialogCancel\")",
        "LookUp_New": "id(\"btnNew\")",
        "LookUp_Remove": "id(\"btnRemove\")",
        "LookUp_Add": "id(\"btnAdd\")",
        "LookUp_Begin": "id(\"butBegin\")",

        //Reports
        "Report_Close": "id(\"btnCancel\")",
        "Report_RunReport": "id(\"btnRun\")",

        //Mobile
        "Mobile_Page": "id(\"Content\")",

        //Processes
        "Process_Open": "id(\"_MBopenObj4703\")/span/a",
        "Process_Name": "id(\"txtWorkflowName\")",
        "Process_BlankWorkflow": "id(\"blankWorkflow\")",
        "Process_ButtonCreate": "id(\"_MBCreate\")",
        "Process_Activate": "id(\"_MBdoActioncrmGrid4703activate\")/span/a",
        "Process_Deactivate": "id(\"_MBdoActioncrmGrid4703deactivate\")/span/a",
        "Process_Delete": "id(\"_MBdoActioncrmGrid4703delete\")/span/a",
        "Process_Begin": "id(\"butBegin\")",

        //O365
        "O365_AddUser": "id(\"DashboardWidgetCommonActions\")/div[2]/div/ul/li[1]/a/div[2]",
        "O365_FirstName": "id(\"firstname\")",
        "O365_LastName": "id(\"lastname\")",
        "O365_DisplayName": "id(\"displayname\")",
        "O365_UserName": "id(\"username\")",
        "O365_License": "id(\"productsinfo\")/div[4]/div[1]/div/div[1]/div[2]/label",
        "O365_Add": "id(\"AddUserSubmit\")",
    },

    ElementId: {
        //Frames
        "Frame_ContentFrameId": "currentcontentid",
        "Frame_DialogFrameId": "InlineDialog[INDEX]_Iframe",
        "Frame_QuickCreateFrameId": "NavBarGloablQuickCreate",
        "Frame_WizardFrameId": "wizardpageframe",
        "Frame_ViewFrameId": "ViewArea",

        //SetValue
        "SetValue_ConfirmId": "_compositionLinkControl_flyoutLoadingArea-confirm",
        "SetValue_FlyOutId": "_compositionLinkControl_flyoutLoadingArea_flyOut",
        "SetValue_CompositionLinkControlId": "_compositionLinkControl_",

        //Dialogs
        "Dialog_ActualRevenue": "actualrevenue_id",
        "Dialog_CloseDate": "closedate_id",
        "Dialog_Description": "description_id",
        "Dialog_UserOrTeamLookupId": "systemuserview_id",

        //Add Connection
        "Dialog_ConnectionDescription": "description",

        //Entity
        "Entity_TabId": "[NAME]_TAB_header_image_div",

        //Timeline
        "Timeline_Task_Subject": "subject",
        "Timeline_Task_Description": "description",
        "Timeline_Task_Duration": "actualdurationminutes",
        "Timeline_Task": "task",

        "Timeline_PhoneCall_Subject": "subject",
        "Timeline_PhoneCall_Number": "phonenumber",
        "Timeline_PhoneCall_Description": "description",
        "Timeline_PhoneCall_Duration": "actualdurationminutes",
        "Timeline_PhoneCall": "phonecall",

        "Timeline_Email_Subject": "subject",
        "Timeline_Email_To": "to",
        "Timeline_Email_CC": "cc",
        "Timeline_Email_Bcc": "bcc",
        "Timeline_Email_Description": "description",
        "Timeline_Email_Duration": "actualdurationminutes",
        "Timeline_Email": "email",

        "Timeline_Appointment_Subject": "subject",
        "Timeline_Appointment_Location": "location",
        "Timeline_Appointment_Description": "description",
        "Timeline_Appointment_Duration": "scheduleddurationminutes",
        "Timeline_Appointment": "appointment",

        //GuidedHelp
        "GuidedHelp_Close": "closeButton",

        //Grid
        "Grid_PrimaryField": "gridBodyTable_primaryField_",

        //Global Search
        "Search_EntityNameId": "entityName",
        "Search_RecordNameId": "attribone",
        "Search_EntityContainersId": "entitypic",

        //ActivityFeed
        "Notes_ActivityPhoneCallDescId": "quickCreateActivity4210controlId_description",
        "Notes_ActivityPhoneCallVoiceMailId": "PhoneCallQuickformleftvoiceCheckBoxContol",
        "Notes_ActivityPhoneCallDirectionId": "quickCreateActivity4210controlId_directioncode_i",
        "Notes_ActivityTaskSubjectId": "quickCreateActivity4212controlId_subject",
        "Notes_ActivityTaskDescriptionId": "quickCreateActivity4212controlId_description",
        "Notes_ActivityTaskPriorityId": "quickCreateActivity4212controlId_prioritycode_i",
        "Notes_ActivityAddTaskDueTimeId": "selectTable_Date",
        "Notes_ActivityAddTaskDueDateId": "quickCreateActivity4212controlId_scheduledend",

        //Process
        "Process_Category": "WorkflowCategory",
        "Process_Entity": "PrimaryEntity",

    },

    CssClass: {
        //Navigation
        "Nav_ActionButtonContainerClass": "navActionButtonContainer",
        "Nav_SubActionElementClass": "nav-rowBody",
        "Nav_TabButtonLinkClass": "navTabButtonLink",
        "Nav_ActionGroupContainerClass": "navActionGroupContainer",
        "Nav_RowLabelClass": "nav-rowLabel",
        "Nav_TopLevelItemClass": "navBarTopLevelItem",

        //Dialogs
        "Dialog_SwitchProcessTitleClass": "ms-crm-ProcessSwitcher-ProcessTitle",
        "Dialog_SelectedRadioButton": "ms-crm-ProcessSwitcher-Process-Selected",

        //SetValue
        "SetValue_LookupRenderClass": "Lookup_RenderButton_td",
        "SetValue_EditClass": "ms-crm-Inline-Edit",
        "SetValue_ValueClass": "ms-crm-Inline-Value",
        "SetValue_MultiSelectPicklistDelete": "sol-quick-delete",


        //DashBoard
        "DashBoard_ViewContainerClass": "ms-crm-VS-Menu",

        //CommandBar
        "CommandBar_FlyoutAnchorArrowClass": "flyoutAnchorArrow",

        //Grid
        "Grid_ViewContainerClass": "ms-crm-VS-Menu",
        "Grid_OpenChartClass": "ms-crm-ImageStrip-navLeft_VisualRefresh",
        "Grid_CloseChartClass": "ms-crm-PaneChevron",
        "Grid_SortColumnClass": "ms-crm-List-Sortable",
        "Grid_DataColumnClass": "ms-crm-List-DataColumn",

        //Entity
        "Entity_LookupRenderClass": "Lookup_RenderButton_td",
        "Entity_PopoutClass": "ms-crm-ImageStrip-popout",

        //Notifications
        "Notification_MessageBarRowClass": "crmAppMessageBarRow",
        "Notification_MessageBarButtonContainerClass": "crmAppMessageBarButtonContainer",
        "Notification_MessageBarMessageClass": "crmAppMessageBarMessage",
        "Notification_MessageBarTitleClass": "crmAppMessageBarTitle",

        //Office365Navigation
        "Office365Navigation_MenuTabContainerClass": "o365cs-nav-navMenuTabContainer",
        "Office365Navigation_AppItemClass": "o365cs-nav-appItem",

    },

    Name: {
        "Dialog_ReportHeader": "crmDialog",

        //Navigation
        "Nav_HomeTab": "TabHome"
    }
};

export const Reference = {
    BusinessProcessFlow: {
        NextStage: "BPF_NextStage",
        PreviousStage: "BPF_PreviousStage",
        Hide: "BPF_Hide",
        SetActive: "BPF_SetActive",
        SelectStage: "BPF_SelectStage",
        Ok: "BPF_Ok",
    },

    Dialogs: {
        Header: "Dialog_Header",
        DeleteHeader: "Dialog_DeleteHeader",
        WorkflowHeader: "Dialog_WorkflowHeader",
        ProcessFlowHeader: "Dialog_ProcessFlowHeader",
        AddConnectionHeader: "Dialog_AddConnectionHeader",
        WarningFooter: "Dialog_WarningFooter",
        WarningCloseButton: "Dialog_WarningCloseButton",
    },

    CloseOpportunity: {
        ActualRevenueId: "Dialog_ActualRevenue",
        CloseDateId: "Dialog_CloseDate",
        DescriptionId: "Dialog_Description",
        Ok: "Dialog_CloseOpportunityOk",
    },

    AddConnection: {
        DescriptionId: "Dialog_ConnectionDescription",
        Save: "Dialog_AddConnectionSave",
        RoleLookupButton: "Dialog_RoleLookupButton",
        RoleLookupTable: "Dialog_RoleLookupTable",
    },

    Assign: {
        Ok: "Dialog_AssignOk",
        UserOrTeamLookupId: "Dialog_UserOrTeamLookupId",
    },

    Delete: {
        Ok: "Dialog_DeleteOk",
    },

    SwitchProcess: {
        Process: "Dialog_SwitchProcessTitleClass",
        SelectedRadioButton: "Dialog_SelectedRadioButton",
    },

    DuplicateDetection: {
        Save: "Dialog_DuplicateOk",
        Cancel: "Dialog_DuplicateCancel",

    },

    RunWorkflow: {
        Confirm: "Dialog_ConfirmWorkflow",
    },

    RunReport: {
        Header: "Dialog_ReportHeader",
        Confirm: "Dialog_ConfirmReport",
        Default: "Dialog_AllRecords",
        Selected: "Dialog_SelectedRecords",
        View: "Dialog_ViewRecords",
    },

    AddUser: {
        Header: "Dialog_AddUserHeader",
        Add: "Dialog_AddUser",
    },

    SetValue: {
        LookupRenderClass: "SetValue_LookupRenderClass",
        EditClass: "SetValue_EditClass",
        ValueClass: "SetValue_ValueClass",
        Confirm: "SetValue_ConfirmId",
        FlyOut: "SetValue_FlyOutId",
        CompositionLinkControl: "SetValue_CompositionLinkControlId",
        Cancel: "SetValue_Cancel",
        Save: "SetValue_Save",
        MultiSelectPicklistDeleteClass: "SetValue_MultiSelectPicklistDelete",
    },

    QuickCreate: {
        Cancel: "QuickCreate_Cancel",
        Save: "QuickCreate_Save",
        EntityContainer: "QuickCreate_EnittyContainer",
    },

    Office365Navigation: {
        NavMenu: "Office365Navigation_NavMenu",
        MenuTabContainer: "Office365Navigation_MenuTabContainerClass",
        AppItem: "Office365Navigation_AppItemClass",
    },

    Frames: {
        ContentPanel: "Frame_ContentPanel",
        ContentFrameId: "Frame_ContentFrameId",
        DialogFrame: "Frame_DialogFrame",
        DialogFrameId: "Frame_DialogFrameId",
        QuickCreateFrame: "Frame_QuickCreateFrame",
        QuickCreateFrameId: "Frame_QuickCreateFrameId",
        WizardFrame: "Frame_WizardFrame",
        WizardFrameId: "Frame_WizardFrameId",
        ViewFrameId: "Frame_ViewFrameId",
    },

    Navigation: {
        HomeTab: "Nav_HomeTab",
        TopLevelItem: "Nav_TopLevelItemClass",
        ActionGroup: "Nav_ActionGroup",
        ActionButtonContainer: "Nav_ActionButtonContainerClass",
        SubActionGroup: "Nav_SubActionGroup",
        SubActionGroupContainer: "Nav_SubActionGroupContainer",
        SubActionElementClass: "Nav_SubActionElementClass",
        GuidedHelp: "Nav_GuidedHelp",
        AdminPortal: "Nav_AdminPortal",
        Settings: "Nav_Settings",
        Options: "Nav_Options",
        PrintPreview: "Nav_PrintPreview",
        AppsForCRM: "Nav_AppsForCrm",
        WelcomeScreen: "Nav_WelcomeScreen",
        About: "Nav_About",
        OptOutLP: "Nav_OptOutLP",
        Privacy: "Nav_Privacy",
        UserInfo: "Nav_UserInfo",
        SignOut: "Nav_SignOut",
        TabGlobalMruNode: "Nav_TabGlobalMruNode",
        GlobalCreate: "Nav_GlobalCreate",
        AdvFindSearch: "Nav_AdvFindSearch",
        Shuffle: "Nav_Shuffle",
        TabNode: "Nav_TabNode",
        SearchLabel: "Nav_SearchLabel",
        SearchButton: "Nav_SearchButton",
        Search: "Nav_Search",
        StartSearch: "Nav_StartSearch",
        TabButtonLink: "Nav_TabButtonLinkClass",
        ActionGroupContainer: "Nav_ActionGroupContainerClass",
        RowLabel: "Nav_RowLabelClass",
        SummaryTab: "Nav_Tab_Summary",
        DetailsTab: "Nav_Tab_Details",
        PerfTab: "Nav_Tab_Perf",
    },

    Grid: {
        JumpBar: "Grid_JumpBar",
        ShowAll: "Grid_ShowAll",
        RowSelect: "Grid_RowSelect",
        Filter: "Grid_Filter",
        ChartList: "Grid_ChartList",
        ChartDialog: "Grid_ChartDialog",
        ToggleSelectAll: "Grid_ToggleSelectAll",
        FirstPage: "Grid_FirstPage",
        NextPage: "Grid_NextPage",
        PreviousPage: "Grid_PreviousPage",
        DefaultViewIcon: "Grid_DefaultViewIcon",
        FindCriteriaImg: "Grid_FindCriteriaImg",
        GridBodyTable: "Grid_GridBodyTable",
        FindCriteria: "Grid_FindCriteria",
        ViewSelector: "Grid_ViewSelector",
        Refresh: "Grid_Refresh",
        ViewContainer: "Grid_ViewContainerClass",
        OpenChart: "Grid_OpenChartClass",
        CloseChart: "Grid_CloseChartClass",
        SortColumn: "Grid_SortColumnClass",
        PrimaryField: "Grid_PrimaryField",
        DataColumn: "Grid_DataColumnClass",
        ViewSelectorContainer: "Grid_ViewSelectorContainer",
        FirstRow: "Grid_FirstRow",
    },

    Entity: {
        Form: "Entity_Form",
        Close: "Entity_Close",
        Tab: "Entity_TabId",
        Save: "Entity_Save",
        FormSelector: "Entity_FormSelector",
        FormSelectorFlyout: "Entity_FormSelectorFlyout",
        FormSelectorItem: "Entity_FormSelectorItem",
        LookupRender: "Entity_LookupRenderClass",
        Popout: "Entity_PopoutClass",
    },

    MenuRelated: {
        Related: "Related_Popout",
        CommonActivities: "Related_Common_Activities",
    },

    Timeline: {
        Popout: "Timeline_Add_Popout",
        PopoutAppointment: "Timeline_Add_Popout_Appointment",
        PopoutEmail: "Timeline_Add_Popout_Email",
        PopoutPhoneCall: "Timeline_Add_Popout_PhoneCall",
        PopoutTask: "Timeline_Add_Popout_Task",
        PopoutNote: "Timeline_Add_Popout_Note",
        PopoutPost: "Timeline_Add_Popout_Post",

        PostText: "Timeline_Post_Text",
        PostAdd: "Timeline_Post_Add",
        PostCancel: "Timeline_Post_Cancel",

        NoteTitle: "Timeline_Note_Title",
        NoteText: "Timeline_Note_Text",
        NoteTextBody: "Timeline_Note_TextBody",
        NoteAdd: "Timeline_Note_Add",
        NoteCancel: "Timeline_Note_Cancel",

        TaskSubject: "Timeline_Task_Subject",
        TaskDescription: "Timeline_Task_Description",
        TaskDuration: "Timeline_Task_Duration",
        Task: "Timeline_Task",

        PhoneCallSubject: "Timeline_PhoneCall_Subject",
        PhoneCallNumber: "Timeline_PhoneCall_Number",
        PhoneCallDescription: "Timeline_PhoneCall_Description",
        PhoneCallDuration: "Timeline_PhoneCall_Duration",
        PhoneCall: "Timeline_PhoneCall",

        EmailSubject: "Timeline_Email_Subject",
        EmailTo: "Timeline_Email_To",
        EmailCC: "Timeline_Email_CC",
        EmailBcc: "Timeline_Email_Bcc",
        EmailDescription: "Timeline_Email_Description",
        EmailDuration: "Timeline_Email_Duration",
        Email: "Timeline_Email",

        AppointmentSubject: "Timeline_Appointment_Subject",
        AppointmentLocation: "Timeline_Appointment_Location",
        AppointmentDescription: "Timeline_Appointment_Description",
        AppointmentDuration: "Timeline_Appointment_Duration",
        Appointment: "Timeline_Appointment",
    },

    GlobalSearch: {
        Filter: "Search_Filter",
        SearchText: "Search_Text",
        SearchButton: "Search_Button",
        SearchResults: "Search_Result",
        Container: "Search_Container",
        EntityContainersId: "Search_EntityContainersId",
        EntityNameId: "Search_EntityNameId",
        RecordNameId: "Search_RecordNameId",
    },

    ActivityFeed: {
        NotesControl: "Notes_NotesControl",
        NotesWall: "Notes_NotesWall",
        NotesText: "Notes_NotesText",
        NotesDone: "Notes_Done",
        PostWall: "Notes_PostWall",
        PostText: "Notes_PostText",
        PostButton: "Notes_PostButton",
        ActivityWall: "Notes_ActivityWall",
        ActivityStatusFilter: "Notes_ActivityStatusFilter",
        ActivityStatusFilterDialog: "Notes_ActivityStatusFilterDialog",
        ActivityStatusAll: "Notes_ActivityStatusAll",
        ActivityStatusOpen: "Notes_ActivityStatusOpen",
        ActivitySTatusOverdue: "Notes_ActivityStatusOverdue",
        ActivityAssociatedView: "Notes_ActivityAssociatedView",
        ActivityPhoneCallDescriptionId: "Notes_ActivityPhoneCallDescId",
        ActivityPhoneCallVoiceMailId: "Notes_ActivityPhoneCallVoiceMailId",
        ActivityPhoneCallDirectionId: "Notes_ActivityPhoneCallDirectionId",
        ActivityPhoneCallOk: "Notes_ActivityPhoneCallOk",
        ActivityTaskOk: "Notes_ActivityTaskOk",
        ActivityTaskSubjectId: "Notes_ActivityTaskSubjectId",
        ActivityTaskDescriptionId: "Notes_ActivityTaskDescriptionId",
        ActivityTaskPriorityId: "Notes_ActivityTaskPriorityId",
        ActivityMoreActivities: "Notes_ActivityMoreActivities",
        ActivityAddEmail: "Notes_ActivityAddEmail",
        ActivityAddAppointment: "Notes_ActivityAddAppointment",
        ActivityAddPhoneCall: "Notes_ActivityAddPhoneCall",
        ActivityAddTask: "Notes_ActivityAddTask",
        VoiceMail: "Notes_VoiceMail",
        ActivityTaskScheduledEnd: "Notes_ActivityTaskScheduledEnd",
        ActivityAddTaskDueTime: "Notes_ActivityAddTaskDueTime",
        ActivityAddTaskDueTimeId: "Notes_ActivityAddTaskDueTimeId",
        ActivityAddTaskDueDateId: "Notes_ActivityAddTaskDueDateId",
    },

    DashBoard: {
        NotesControl: "Notes_NotesControl",
        NotesWall: "Notes_NotesWall",
        Selector: "DashBoard_Selector",
        ViewContainerClass: "DashBoard_ViewContainerClass",
    },

    CommandBar: {
        RibbonManager: "CommandBar_RibbonManager",
        List: "CommandBar_List",
        MoreCommands: "CommandBar_MoreCommands",
        FlyoutAnchorArrow: "CommandBar_FlyoutAnchorArrowClass",

    },

    GuidedHelp: {
        MarsOverlay: "GuidedHelp_MarsOverlay",
        ButBegin: "GuidedHelp_ButBegin",
        ButtonClose: "GuidedHelp_ButtonClose",
        Close: "GuidedHelp_Close",
    },

    Notification: {
        AppMessageBar: "Notification_AppMessageBar",
        Close: "Notification_Close",
        MessageBarRow: "Notification_MessageBarRowClass",
        MessageBarButtonContainer: "Notification_MessageBarButtonContainerClass",
        MessageBarMessage: "Notification_MessageBarMessageClass",
        MessageBarTitle: "Notification_MessageBarTitleClass",
    },

    LookUp: {
        SelObjects: "LookUp_SelObjects",
        SavedQuerySelector: "LookUp_SavedQuerySelector",
        DialogCancel: "LookUp_DialogCancel",
        New: "LookUp_New",
        Remove: "LookUp_Remove",
        Add: "LookUp_Add",
        Begin: "LookUp_Begin",
    },

    Login: {
        UserId: "Login_UserId",
        LoginPassword: "Login_Password",
        SignIn: "Login_SignIn",
        CrmMainPage: "Login_CrmMainPage",
        CrmUCIMainPage: "Login_CrmUCIMainPage",
        StaySignedIn: "Login_StaySignedIn",
        OneTimeCode: "Login_OneTimeCode",
    },

    Report: {
        Close: "Report_Close",
        RunReport: "Report_RunReport",
    },

    Mobile: {
        Page: "Mobile_Page",
    },

    Office365: {
        AddUser: "O365_AddUser",
        FirstName: "O365_FirstName",
        LastName: "O365_LastName",
        DisplayName: "O365_DisplayName",
        UserName: "O365_UserName",
        License: "O365_License",
        Add: "O365_Add",
    },

    Process: {
        Open: "Process_Open",
        Name: "Process_Name",
        Category: "Process_Category",
        Entity: "Process_Entity",
        BlankWorkflow: "Process_BlankWorkflow",
        Create: "Process_ButtonCreate",
        Activate: "Process_Activate",
        Deactivate: "Process_Deactivate",
        Delete: "Process_Delete",
        Begin: "Process_Begin",
    }
};
