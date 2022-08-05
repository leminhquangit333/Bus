const _SEARCH_PARAMS = {
    MODE: {
      NAME: "mode=:mode",
      VALUES: {
        VIEW: "mode=view",
        EDIT: "mode=edit",
      },
    },
    ID: ":id",
  };
  
  export const Constants = {
    API_GATEWAY: "",
    EMPTY_VALUE_DEFAULT: "-",
    GRANT_TYPE_PASSWORD: "password",
    AUTHORIZATION_HEADER: "Authorization",
  
    PATH_ROUTE: {
      LANDING_PAGE: "/",
      LOGIN: "/login",
      HOME: "/home",
      SUPPORT: "/support",
      BUS_MANAGER: {
        PATH_NAME: "/bus-manager",
        SEARCH_PATTERN: "/bus-manager" + _SEARCH_PARAMS.MODE.NAME,
      },
      SCHEDUCE_MANAGER: {
        PATH_NAME: "/scheduce-manager",
        SEARCH_PATTERN: "/scheduce-manager" + _SEARCH_PARAMS.MODE.NAME,
      },
      REPORT_MANAGER: {
        PATH_NAME: "/report-manager",
        SEARCH_PATTERN: "/report-manager" + _SEARCH_PARAMS.MODE.NAME,
      },
      TICKET_MANAGER: {
        PATH_NAME: "/ticket-manager",
        SEARCH_PATTERN: "/ticket-manager" + _SEARCH_PARAMS.MODE.NAME,
      },
    },
  
    SEARCH_PARAMS: _SEARCH_PARAMS,
    LOCAL_STORAGE: "web_auth",
  
    NOTIFICATION_TYPE: {
      SUCCESS: "success",
      ERROR: "error",
    },
  
    API_URL: {
      LOGIN: "api/login",
      FIND_BUS_BY_SCHEDUCE_DATE: (start: number, end: number) =>
        `api/v1/bus?startDate=${start}&endDate=${end}`,
      FIND_ALL_BUS: "api/v1/bus/all",
      SAVE_BUS: "api/v1/bus/save",
      GET_BUS_DETAIL: (scheduceId: number) =>
      `api/v1/bus/detail?scheduceId=${scheduceId}`,
      EXPORT_TICKET:(id: number)=> `api/v1/bus/export?scheduceId=${id}`,
    },
  };
  