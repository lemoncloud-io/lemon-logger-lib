import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { mergeMap, retry } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

export class HttpService {

    private axiosInstance: AxiosInstance;
    private httpMethod: Method;
    private httpPath: string;

    private logMessageSubject$: Subject<string>; // used by Logger
    private logMessage$: Observable<string>;

    constructor(host: string, method: any = 'GET', path: string = '') {
        // set http options for axios
        const AXIOS_CONFIG: AxiosRequestConfig = {
            baseURL: host,
            timeout: 10000,
            responseType: 'json'
        };
        this.axiosInstance = axios.create(AXIOS_CONFIG);
        this.httpMethod = method;
        this.httpPath = path;

        // for queue the requests
        this.logMessageSubject$ = new Subject<string>();
        this.logMessage$ = this.logMessageSubject$.asObservable();
        this.subscribeLogMessage();
    }

    public requestSendLog(message: string) {
        this.logMessageSubject$.next(message);
    }

    private subscribeLogMessage() {
        this.logMessage$
            .pipe(mergeMap((message: string) => this.doRequest$({ message }), 1))
            .subscribe(
                (res: any) => console.log(`return: ${res.data.message}`),
                err => console.error(err),
                () => console.log('DONE')
            );
    }

    private doRequest$(data: any) { // data: { ... }
        const spec: AxiosRequestConfig = {
            method: this.httpMethod,
            url: this.httpPath,
            data: data
        };
        return fromPromise(this.request(spec))
            .pipe(retry(3));
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

