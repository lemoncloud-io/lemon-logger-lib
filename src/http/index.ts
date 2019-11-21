import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export class HttpService {

    private axiosInstance: AxiosInstance;
    private httpMethod: Method;
    private httpPath: string;

    constructor(host: string, method: any = 'GET', path: string = '') {
        const AXIOS_CONFIG: AxiosRequestConfig = {
            baseURL: host,
            timeout: 10000,
            responseType: 'json'
        };
        this.axiosInstance = axios.create(AXIOS_CONFIG);
        this.httpMethod = method;
        this.httpPath = path;
    }

    public sendLog(message: string) {
        const spec: AxiosRequestConfig = {
            method: this.httpMethod,
            url: this.httpPath,
            data: { message }
        };

        return this.doRequest(spec);
    }

    private doRequest(spec: AxiosRequestConfig) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.request(spec)
                .then((res: AxiosResponse) => resolve(this.resSerializer(res)))
                .catch((err: any) => reject(this.resSerializer(err.response)));
        });
    }

    private resSerializer(res: AxiosResponse) {
        return {
            status: res.status,
            data: res.data,
        };
    }
}
