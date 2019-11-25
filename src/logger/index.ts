import { UtilsService } from '../utils';
import { HttpService } from '../http';
import { SocketService } from '../socket';

export enum LogType {
    DEBUG = 'DEBUG',
    WARN = 'WARN',
    INFO = 'INFO',
    ERROR = 'ERROR',
}

export interface LogInterface {
    debug(message: string, ...extraParams: any[]): void;
    warn(message: string, ...extraParams: any[]): void;
    info(message: string, ...extraParams: any[]): void;
    error(message: string, ...extraParams: any[]): void;
}

export interface FormatInterface {
    timestampFormat: string;
    typeFormat: string;
    textFormat: string;
    namespaceFormat: string;
}

export class Logger implements LogInterface {
    private httpClient: HttpService;
    private socketClient: SocketService;
    private utils: UtilsService;

    private isNode: boolean;
    private isBrowser: boolean;
    private namespace: string;
    private options = {
        showTimestamp: true,
        showLogType: true,
        // for request
        shouldSend: false,
        httpHost: '',
        httpMethod: '',
        httpPath: '',
        // for socket
        useSocket: false,
        socketHost: '',
        socketEvent: '',
        // TODO: add more options
    };

    constructor(namespace: string = 'LEMON', options: any = {}) {
        this.utils = new UtilsService();
        this.namespace = namespace;
        this.options = { ...this.options, ...options };

        this.isNode = this.utils.isNode();
        this.isBrowser = this.utils.isBrowser();

        this.setHttpClient();
        this.setSocketClient();
    }

    public log(message: string, ...extraParams: any[]) {
        const formattedMessage = this.utils.formatMessage(message, extraParams);
        this.writeLog(LogType.DEBUG, formattedMessage);
    }

    public debug(message: string, ...extraParams: any[]) {
        const formattedMessage = this.utils.formatMessage(message, extraParams);
        this.writeLog(LogType.DEBUG, formattedMessage);
    }

    public warn(message: string, ...extraParams: any[]) {
        const formattedMessage = this.utils.formatMessage(message, extraParams);
        this.writeLog(LogType.WARN, formattedMessage);
    }

    public info(message: string, ...extraParams: any[]) {
        const formattedMessage = this.utils.formatMessage(message, extraParams);
        this.writeLog(LogType.INFO, formattedMessage);
    }

    public error(message: string, ...extraParams: any[]) {
        const formattedMessage = this.utils.formatMessage(message, extraParams);
        this.writeLog(LogType.ERROR, formattedMessage);
    }

    public setOptions(options: any = {}) {
        this.options = { ...this.options, ...options };
        const shouldResetHttpClient = options.httpHost || options.httpMethod || options.httpPath;
        if (shouldResetHttpClient) {
            this.setHttpClient();
        }

        const shouldResetSocketClient = options.socketHost || options.socketEvent;
        if (shouldResetSocketClient) {
            this.setSocketClient();
        }
    }

    public closeSocket() {
        if (this.options.useSocket) {
            this.socketClient.close();
        }
    }

    private setHttpClient() {
        const shouldSendLog = this.options.shouldSend && this.options.httpHost;
        if (shouldSendLog) {
            const { httpHost, httpMethod, httpPath } = this.options;
            this.httpClient = new HttpService(httpHost, httpMethod, httpPath);
        }
    }

    private setSocketClient() {
        const useSocket = this.options.useSocket && this.options.socketHost;
        if (useSocket) {
            const { socketHost, socketEvent } = this.options;
            this.socketClient = new SocketService(socketHost, socketEvent);
        }
    }

    private writeLog(type: LogType, message: string) {
        // check http
        const shouldSendLog = this.options.shouldSend && this.options.httpHost;
        if (shouldSendLog) {
            this.sendLogMessage(type, message);
        }

        // check socket
        const useSocket = this.options.useSocket && this.options.socketHost;
        if (useSocket) {
            this.sendMessageToSocket(type, message);
        }

        const format: FormatInterface = this.getFormat(type);
        const formattedText = this.createLogMessage(type, message, format);
        if (this.isNode) {
            console.log(formattedText);
            return;
        }
        // isBrowser
        this.logOnBrowser(type, formattedText, format);
        return;
    }

    private sendLogMessage(type: LogType, message: string) {
        const unformattedText = this.getUnformattedLogMessage(type, message);
        this.httpClient.requestSendLog(unformattedText);
    }

    private sendMessageToSocket(type: LogType, message: string) {
        const unformattedText = this.getUnformattedLogMessage(type, message);
        this.socketClient.sendMessage(unformattedText);
    }

    private getUnformattedLogMessage(type: LogType, message: string) {
        const defaultFormat: FormatInterface = {
            timestampFormat: '',
            typeFormat: '',
            namespaceFormat: '',
            textFormat: ': ',
        };
        return this.createLogMessage(type, message, defaultFormat, false);
    }

    private createLogMessage(type: LogType, text: string, format: FormatInterface, shouldFormat: boolean = true) {
        const typeBlank = type === LogType.INFO || type === LogType.WARN ? ' ' : '';
        const { showTimestamp, showLogType } = this.options;
        let { timestampFormat, typeFormat, textFormat, namespaceFormat } = format;

        if (this.isBrowser && shouldFormat) {
            timestampFormat = '%c';
            typeFormat = '%c';
            namespaceFormat = '%c';
            textFormat = ': %c';
        }

        const timestampLog = showTimestamp
            ? `${timestampFormat}${this.createTimestamp(new Date())} `
            : `${timestampFormat}`; // format 정해줘야 browser에서 포맷 안깨짐
        const typeLog = showLogType ? `${typeFormat}[${type}]${typeBlank} ` : `${typeFormat}`;
        const namespaceLog = `${namespaceFormat}${this.namespace}`;
        const textLog = `${textFormat}${text}`;
        return `${timestampLog}${typeLog}${namespaceLog}${textLog}`;
    }

    private logOnBrowser(type: LogType, message: string, format: FormatInterface) {
        const { timestampFormat, typeFormat, namespaceFormat, textFormat } = format;
        if (type === LogType.ERROR) {
            console.error(message, timestampFormat, typeFormat, namespaceFormat, textFormat);
        } else {
            console.log(message, timestampFormat, typeFormat, namespaceFormat, textFormat);
        }
    }

    private getFormat(type: LogType): FormatInterface {
        if (this.isNode) {
            return this.getNodeFormat(type);
        }
        // isBrowser
        return this.getBrowserFormat(type);
    }

    private getNodeFormat(type: LogType): FormatInterface {
        const whiteColor = this.utils.getColorByName('White');
        const typeColor = this.utils.getColorAsType(type);
        const greyColor = this.utils.getColorByName('Grey');

        const timestampFormat = '\u001b[3' + greyColor + 'm';
        const typeFormat = '\u001b[3' + typeColor + ';22m';
        const namespaceFormat = '\u001b[3' + whiteColor + ';1m';
        const textFormat = '\u001b[0m: ';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    private getBrowserFormat(type: LogType): FormatInterface {
        const blackColor = this.utils.getColorByName('Black');
        const typeColor = this.utils.getColorAsType(type);
        const greyColor = this.utils.getColorByName('Grey');

        const timestampFormat = 'color:' + greyColor;
        const typeFormat = 'color:' + typeColor;
        const namespaceFormat = 'color:' + blackColor + '; font-weight: bold';
        const textFormat = ': ';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    //! timestamp like 2016-12-08 13:30:44 @lemon-engine
    private createTimestamp(date: Date) {
        const zeroOrNull = (text: number) => (text < 10 ? '0' : '');
        const dt = date || new Date();
        const [year, month, day, hours, minutes, seconds] = [
            dt.getFullYear(),
            dt.getMonth() + 1,
            dt.getDate(),
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
        ];

        const dateText = `${zeroOrNull(year)}${year}-${zeroOrNull(month)}${month}-${zeroOrNull(day)}${day}`; // yyyy-mm-dd
        const hoursText = `${zeroOrNull(hours)}${hours}:${zeroOrNull(minutes)}${minutes}:${zeroOrNull(seconds)}${seconds}`; //hh:mm:ss
        return `${dateText} ${hoursText}`;
    }
}
