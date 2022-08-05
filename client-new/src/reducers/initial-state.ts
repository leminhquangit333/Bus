

// tslint:disable-next-line:prefer-const
let initState: {
    rootReducer: {
      isEditMode: boolean;
      isChange: boolean;
      isMobileMode: boolean;
      pageTitle: {
        title: string;
        params: any;
        editIcon: {
          show: boolean;
          onClick: any;
        };
      };
      isLoadingPageContent: boolean;
      isIntervalUpdate: boolean;
      // isLoadedPartPageContent: boolean;
    };
  } = {
    rootReducer: {
      isEditMode: false,
      isChange: false,
      isMobileMode: false,
      pageTitle: {
        title: "",
        params: {},
        editIcon: {
          show: false,
          // tslint:disable-next-line:no-empty
          onClick: () => {},
        },
      },
      isLoadingPageContent: true,
      isIntervalUpdate: false,
      // isLoadedPartPageContent: false,
    }
  };
  
  export default initState;
  