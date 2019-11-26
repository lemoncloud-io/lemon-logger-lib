import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export class HttpService {
    private axiosInstance: AxiosInstance;
    private httpMethod: Method;
    private httpPath: string;
    private tasks: any;

    constructor(host: string, method: any = 'GET', path: string = '') {
        // set http options for axios
        const AXIOS_CONFIG: AxiosRequestConfig = {
            baseURL: host,
            timeout: 10000,
            responseType: 'json',
        };
        this.axiosInstance = axios.create(AXIOS_CONFIG);
        this.httpMethod = method;
        this.httpPath = path;
        // for queue the requests
        this.tasks = Promise.resolve();
    }

    public requestSendLog(message: string) {
        this.runRequestQueue({ message });
    }

    private runRequestQueue(bodyData: any = {}) {
        return new Promise((resolve, reject) => {
            this.tasks = this.tasks.then(async () => {
                try {
                    const response = await this.doRequest$(bodyData);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
                return Promise.resolve();
            });
        });
    }

    private doRequest$(data: any) { // data: { ... }
        const spec: AxiosRequestConfig = {
            method: this.httpMethod,
            url: this.httpPath,
            data: data,
        };
        return this.request(spec);
    }

    private request(spec: AxiosRequestConfig) {
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
