import axios from "axios";
import { Constants } from "../utils/Constants";
import { Token } from "../utils/CommonModel";
import { throttleAdapterEnhancer } from "axios-extensions";

export const HTTP_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const _user = localStorage.getItem(Constants.LOCAL_STORAGE);
const user = _user ? JSON.parse(_user) : undefined;
let auth: any;
let history: any;

export const axiosInstance = axios.create({
  timeout: 20000,
  // headers: {
  //   // Authorization: user?.access_token,
  //   // "X-Tenant": user?.tenantId,
  // },
  headers: { "Cache-Control": "no-cache, no-store", Pragma: "no-cache" },
  adapter: throttleAdapterEnhancer((axios as any).defaults.adapter, {
    threshold: 2000,
  }),
});

export const updateAxiosInstance = (
  token: Token,
  _auth: any,
  _history: any
) => {
  if (token?.accessToken) {
    axiosInstance.defaults.headers[Constants.AUTHORIZATION_HEADER] =
      token.accessToken;
  }

  auth = _auth;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    // if (!store.getState().rootReducer.isIntervalUpdate) {
    //   numberOfAjaxCallPending++;
    //   // show loader
    //   ReduxService.updateIsLoadingPage(true);
    // } else {
    //   numberOfAjaxCallIntervalPending++;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    // if (!store.getState().rootReducer.isIntervalUpdate) {
    //   numberOfAjaxCallPending--;

    //   if (numberOfAjaxCallPending === 0) {
    //     // hide loader
    //     ReduxService.updateIsLoadingPage(false);
    //   }
    // } else {
    //   numberOfAjaxCallIntervalPending--;

    //   if (numberOfAjaxCallIntervalPending === 0) {
    //     // hide loader
    //     ReduxService.updateIntervalUpdateStatus(false);
    //   }
    // }
    return response;
  },
  (error: any) => {
    // if (!store.getState().rootReducer.isIntervalUpdate) {
    //   numberOfAjaxCallPending--;

    //   if (numberOfAjaxCallPending === 0) {
    //     // hide loader
    //     ReduxService.updateIsLoadingPage(false);
    //   }
    // } else {
    //   numberOfAjaxCallIntervalPending--;

    //   if (numberOfAjaxCallIntervalPending === 0) {
    //     // hide loader
    //     ReduxService.updateIntervalUpdateStatus(false);
    //   }
    // }
    return Promise.reject(error);
  }
);

/**
 * HTTP delete request
 *
 * @param _url
 * @param _loading
 * @param _data
 * @param _responseType
 * @param _params
 * @param _headers
 * @param _baseURL
 */
export const deleteRequest = async (
  _url: string,
  _loading: boolean = true,
  _responseType?: any,
  _params?: any,
  _headers?: any,
  _baseURL?: string
) => {
  return await sendHttpRequest(
    _url,
    HTTP_METHOD.DELETE,
    _loading,
    _responseType,
    _params,
    _headers,
    _baseURL
  );
};

/**
 * HTTP put request
 *
 * @param _url
 * @param _loading
 * @param _data
 * @param _responseType
 * @param _params
 * @param _headers
 * @param _baseURL
 */
export const putRequest = async (
  _url: string,
  _data?: any,
  _loading: boolean = true,
  _responseType?: any,
  _params?: any,
  _headers?: any,
  _baseURL?: string
) => {
  return await sendHttpRequest(
    _url,
    HTTP_METHOD.PUT,
    _loading,
    _data,
    _responseType,
    _params,
    _headers,
    _baseURL
  );
};

/**
 * HTTP post request
 *
 * @param _url
 * @param _loading
 * @param _data
 * @param _responseType
 * @param _params
 * @param _headers
 * @param _baseURL
 */
export const postRequest = async (
  _url: string,
  _data: any,
  _cache: boolean = false,
  _loading: boolean = true,
  _responseType?: any,
  _params?: any,
  _headers?: any,
  _baseURL?: string
) => {
  return await sendHttpRequest(
    _url,
    HTTP_METHOD.POST,
    _loading,
    _data,
    _responseType,
    _params,
    _headers,
    _baseURL,
    _cache
  );
};

/**
 * Http get request
 *
 * @param _url
 * @param _loading
 * @param _data
 * @param _responseType
 * @param _params
 * @param _headers
 * @param _baseURL
 */
export const getRequest = async (
  _url: string,
  _cache: boolean = true,
  _loading: boolean = true,
  _responseType?: any,
  _params?: any,
  _headers?: any,
  _baseURL?: string
) => {
  return await sendHttpRequest(
    _url,
    HTTP_METHOD.GET,
    _loading,
    undefined,
    _responseType,
    _params,
    _headers,
    _baseURL,
    _cache
  );
};

async function sendHttpRequest(
  _url: string,
  _method: any = HTTP_METHOD.GET,
  _loading: boolean = true,
  _data: any,
  _responseType: any = "json",
  _params: any,
  _headers: any,
  _baseURL: string = Constants.API_GATEWAY,
  _cache: boolean = true
) {
  return await axiosInstance({
    method: _method,
    url: _url,
    data: _data,
    baseURL: _baseURL,
    responseType: _responseType,
    headers: _headers,
    params: _params,
    cache: _cache,
    forceUpdate: _cache,
  })
    .then(handleSuccess)
    .catch(handleError)
    .finally(() => {
      _loading = false;
    });
}

function handleSuccess(response: any) {
  return response;
}

const DEFAULT_ERROR_CODE = "serverMessage.E0001";
function handleError(error: any) {
  let statusCode;
  let errorCode;

  const response = error?.response || {};
  // Get response status code
  if (response.status) {
    statusCode = response.status;
  } else if (response.message) {
    // tslint:disable-next-line:radix
    statusCode = parseInt(
      response.message.split("Request failed with status code ")[1]
    );
  }

  // Get error code key from response.
  if (response?.data?.code) {
    errorCode = "serverMessage." + response.data.code;
  } else {
    switch (statusCode) {
      case 400:
      case 405:
        errorCode = "serverMessage.E0002";
        break;
      case 404:
        errorCode = "serverMessage.E0003";
        break;
      case 409:
        errorCode = "serverMessage.E0002";
        break;
      case 401:
        errorCode = "serverMessage.E0022";
        break;
      case 500:
        errorCode = "serverMessage.E0006";
        break;
      default:
        errorCode = DEFAULT_ERROR_CODE;
        break;
    }
  }

  errorCode = errorCode || DEFAULT_ERROR_CODE;

  if (error === "serverMessage.TOKEN_INVALID") {
    errorCode = "serverMessage.E0022";
  }

  let errorMessage = errorCode;

  if (response?.data?.errors) {
    const params = response.data.errors;
    for (const key in params) {
      errorMessage = errorMessage.replace(
        new RegExp(`{${key}}`, "g"),
        params[key]
      );
    }
  }

  if (statusCode === 401) {
    localStorage.removeItem(Constants.LOCAL_STORAGE);
  }

  return Promise.reject(response);
}
