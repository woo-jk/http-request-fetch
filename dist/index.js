// src/index.ts
var processHttpResponse = async (response, config) => {
  const data = await response.json().catch(() => ({}));
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return { data, config, headers, ok, redirected, status, statusText, type, url };
};
var Http = class {
  constructor(baseURL = "", defaultConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = defaultConfig;
    this.interceptor = {
      onRequest: (config) => config,
      onResponse: (response) => response,
      onRequestError: (reason) => Promise.reject(reason),
      onResponseError: (reason) => Promise.reject(reason)
    };
  }
  registerInterceptor(interceptor) {
    this.interceptor = {
      ...this.interceptor,
      ...interceptor
    };
  }
  request(url, config) {
    if (!url.startsWith("http")) {
      url = `${this.baseURL}${url}`;
    }
    config = { ...this.defaultConfig, ...this.interceptor.onRequest(config) };
    config.headers = { ...this.defaultConfig.headers, ...config.headers };
    try {
      return fetch(url, config).then((response) => processHttpResponse(response, config)).then(this.interceptor.onResponse).catch(this.interceptor.onResponseError);
    } catch (reason) {
      return this.interceptor.onRequestError(reason);
    }
  }
  get(url, config = {}) {
    return this.request(url, {
      ...config,
      method: "GET"
    });
  }
  post(url, config = {}) {
    return this.request(url, {
      ...config,
      method: "POST"
    });
  }
  patch(url, config = {}) {
    return this.request(url, {
      ...config,
      method: "PATCH"
    });
  }
  put(url, config = {}) {
    return this.request(url, {
      ...config,
      method: "PUT"
    });
  }
  delete(url, config = {}) {
    return this.request(url, {
      ...config,
      method: "DELETE"
    });
  }
};
var src_default = Http;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
