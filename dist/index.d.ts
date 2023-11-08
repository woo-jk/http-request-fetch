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
declare class Http {
    private baseURL;
    private defaultConfig;
    private interceptor;
    constructor(baseURL?: string, defaultConfig?: RequestInit);
    registerInterceptor(interceptor: Partial<Interceptor>): void;
    request<T extends object = object>(url: string, config: RequestInit): Promise<HttpResponse<T>>;
    get<T extends object>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
    post<T extends object>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
    patch<T extends object>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
    put<T extends object>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
    delete<T extends object>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
}
export default Http;
