import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager } from 'axios';
import cookieService from "@/services/CookieService";

type CustomResponseFormat<T = any> = {
    response: T;
    // refreshedToken?: string;
  }
  interface CustomInstance extends AxiosInstance {
      interceptors: {
          request: AxiosInterceptorManager<AxiosRequestConfig>;
          response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
      };
      getUri(config?: AxiosRequestConfig): string;
      request<T>(config: AxiosRequestConfig): Promise<T>;
      get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
      delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
      head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
      options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
      post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
      put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
      patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }

export default class ApiConnection {
    #axios: CustomInstance;
    #baseURL?: string = process.env.VITE_API_URI;

    constructor(baseURL: string){
        this.#baseURL = baseURL ?? this.#baseURL;
        this.#axios = axios.create({baseURL: this.#baseURL});

        this.#axios.interceptors.request.use(function (config) {
            if(!config) return config;
            const accessToken = cookieService.getAccessToken();
            if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        })
    }
}