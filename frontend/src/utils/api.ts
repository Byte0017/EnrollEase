import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Api {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.request.use(this.handleRequest);
        this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError);
    }

    private handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
        // Add any request interceptors here, like adding authorization tokens
        return config;
    }

    private handleResponse(response: AxiosResponse): AxiosResponse {
        // Handle responses, like checking for specific status codes
        return response;
    }

    private handleError(error: any): Promise<any> {
        // Handle errors, like logging or showing notifications
        return Promise.reject(error);
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }
}

const api = new Api('https://api.example.com');

export default api;