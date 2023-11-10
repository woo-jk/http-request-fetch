// src/index.ts
var processHttpResponse = async (response, config) => {
  const data = await response.json().catch(() => ({}));
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return { data, config, headers, ok, redirected, status, statusText, type, url };
};
var createHttp = (baseURL = "", defaultConfig = {}) => {
  let interceptor = {
    onRequest: (config) => config,
    onResponse: (response) => response,
    onRequestError: (reason) => Promise.reject(reason),
    onResponseError: (reason) => Promise.reject(reason)
  };
  const request = async (url, config) => {
    if (!url.startsWith("http")) {
      url = `${baseURL}${url}`;
    }
    config = { ...defaultConfig, ...interceptor.onRequest(config) };
    config.headers = { ...defaultConfig.headers, ...config.headers };
    try {
      const response = await fetch(url, config);
      return processHttpResponse(response, config).then(interceptor.onResponse).catch(interceptor.onResponseError);
    } catch (reason) {
      return interceptor.onRequestError(reason);
    }
  };
  return {
    request,
    get: (url, config = {}) => request(url, {
      ...config,
      method: "GET"
    }),
    post: (url, config = {}) => request(url, {
      ...config,
      method: "POST"
    }),
    patch: (url, config = {}) => request(url, {
      ...config,
      method: "PATCH"
    }),
    put: (url, config = {}) => request(url, {
      ...config,
      method: "PUT"
    }),
    delete: (url, config = {}) => request(url, {
      ...config,
      method: "DELETE"
    }),
    registerInterceptor: (customInterceptor) => {
      interceptor = {
        ...interceptor,
        ...customInterceptor
      };
    }
  };
};
var src_default = createHttp;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
