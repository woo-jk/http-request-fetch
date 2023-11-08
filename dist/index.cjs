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
//# sourceMappingURL=index.cjs.map
