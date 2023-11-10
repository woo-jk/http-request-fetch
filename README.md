# http-request-fetch

fetch API에 기반한 http 요청 모듈입니다.

# 설치 방법

```
npm i http-request-fetch

yarn add http-request-fetch
```

# 사용 방법

```js
// ES Module
import createHttp from "http-request-fetch";

// Common JS
const createHttp = require("http-request-fetch").default;
```

### 예시

```js
import createHttp from "http-request-fetch";

const http = createHttp();

http.request("/api/1").then(function (response) {
  // ...
});
```

# Base URL, Default Config

http 함수를 생성할 때, 요청시 기본 url과 기본 config를 설정할 수 있습니다.

```js
const BASE_URL = "https://api.example.com";

const DEFAULT_CONFIG = { headers: { "Content-Type": "application/json" } };

const http = createHttp(BASE_URL, DEFAULT_CONFIG);

http.request("/api/1"); // https://api.example.com/api/1로 요청
```

# Interceptors

http 요청이나 응답이 처리되기 전에 가로채서 특정 로직을 수행하도록 설정할 수 있습니다.

### Interceptors 사용법 및 Interceptor 종류

```js
const http = createHttp();

http.registerInterceptor({
  onRequest: function (config) {
    // request를 보내기 전 수행할 로직
    return config;
  },
  onResponse: function (response) {
    // response를 받고나서 수행할 로직
    return response;
  },
  onRequestError: function (reason) {
    // request 과정에서 에러가 발생할 경우 수행할 로직
    return Promise.reject(reason);
  },
  onResponseError: function (reason) {
    // response 과정에서 에러가 발생할 경우 수행할 로직
    return Promise.reject(reason);
  },
});
```

Interceptor를 활용해서 인증 토큰 갱신, 응답 에러 처리 등 기존의 반복적이고 불편했던 통신 로직들을 쉽게 처리할 수 있습니다.

# HttpResponse Type

http의 응답 값은 fetch API의 `Response` 타입을 확장한 `HttpResponse` 타입의 응답 값을 반환 받습니다.

### HttpResponse

`HttpResponse` 타입은 `Response` 타입에서 `data` 필드가 추가되었습니다.

```js
type HttpResponse<T extends object> = {
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
```

Response의 body가 JSON 형식일 경우, JSON 파싱을 해서 `data` 필드에 담겨지게 됩니다.

### 사용 예시

```js
// before using http
fetch("/api/1")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

// after using http
http.request("/api/1").then((response) => {
  console.log(response.data);
});
```

기존의 fetch 요청에서의 json 파싱 과정은 반복되는 로직이고, 에러 발생 가능성도 있습니다.

http에서는 별도의 json 파싱 과정 없이 바로 data를 사용할 수 있습니다.

# HTTP Method alias

편의를 위해 http 메소드별 alias를 사용하여 요청할 수 있습니다.

- http.get(url, config?)
- http.post(url, config?)
- http.patch(url, config?)
- http.put(url, config?)
- http.delete(url, config?)

### 사용 예시

```js
// GET 요청
http.get("/api/1");

// POST 요청
http.post("/api/1", { body: { example: 1 } });
```

# License

MIT
