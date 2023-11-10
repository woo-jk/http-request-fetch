"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
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
//# sourceMappingURL=index.cjs.map
