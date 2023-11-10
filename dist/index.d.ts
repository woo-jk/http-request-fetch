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
declare const createHttp: (baseURL?: string, defaultConfig?: RequestInit) => {
    request: <T extends object = object>(url: string, config: RequestInit) => Promise<HttpResponse<T>>;
    get: <T_1 extends object>(url: string, config?: RequestInit) => Promise<HttpResponse<T_1>>;
    post: <T_2 extends object>(url: string, config?: RequestInit) => Promise<HttpResponse<T_2>>;
    patch: <T_3 extends object>(url: string, config?: RequestInit) => Promise<HttpResponse<T_3>>;
    put: <T_4 extends object>(url: string, config?: RequestInit) => Promise<HttpResponse<T_4>>;
    delete: <T_5 extends object>(url: string, config?: RequestInit) => Promise<HttpResponse<T_5>>;
    registerInterceptor: (customInterceptor: Partial<Interceptor>) => void;
};
export default createHttp;
