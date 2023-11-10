export type HttpResponse<T extends object> = {
  data: T;
  config: RequestInit;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
};

type Interceptor = {
  onRequest: (config: RequestInit) => RequestInit;
  onResponse: <T extends object>(response: HttpResponse<T>) => HttpResponse<T> | PromiseLike<HttpResponse<T>>;
  onRequestError: (reason: unknown) => Promise<never>;
  onResponseError: (reason: unknown) => Promise<never>;
};

const processHttpResponse = async <T extends object>(response: Response, config: RequestInit) => {
  const data = (await response.json().catch(() => ({}))) as T;
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return { data, config, headers, ok, redirected, status, statusText, type, url };
};

const createHttp = (baseURL = "", defaultConfig: RequestInit = {}) => {
  let interceptor: Interceptor = {
    onRequest: (config) => config,
    onResponse: (response) => response,
    onRequestError: (reason) => Promise.reject(reason),
    onResponseError: (reason) => Promise.reject(reason),
  };

  const request = async <T extends object = object>(url: string, config: RequestInit) => {
    if (!url.startsWith("http")) {
      url = `${baseURL}${url}`;
    }

    config = { ...defaultConfig, ...interceptor.onRequest(config) };
    config.headers = { ...defaultConfig.headers, ...config.headers };

    try {
      const response = await fetch(url, config);
      return processHttpResponse<T>(response, config).then(interceptor.onResponse).catch(interceptor.onResponseError);
    } catch (reason) {
      return interceptor.onRequestError(reason);
    }
  };

  return {
    request,
    get: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "GET",
      }),
    post: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "POST",
      }),
    patch: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "PATCH",
      }),
    put: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "PUT",
      }),
    delete: <T extends object>(url: string, config: RequestInit = {}) =>
      request<T>(url, {
        ...config,
        method: "DELETE",
      }),

    registerInterceptor: (customInterceptor: Partial<Interceptor>) => {
      interceptor = {
        ...interceptor,
        ...customInterceptor,
      };
    },
  };
};

export default createHttp;
