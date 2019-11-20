import { format } from 'util';
import { EventEmitter } from 'events';
import { LogInterface, LogType, FormatInterface } from '../constant/logger.constant';

import { isNode, isBrowser } from './detectPlatform';
import { ColorService } from './color';

export class LemonLog implements LogInterface {
    private eventEmitter: EventEmitter;
    private colorService: ColorService;
    private namespace: string;
    private options = {
        showTimestamp: true,
        showLogType: true,
        shouldSave: true,
        endpoint: ''
        // TODO: add more options
    };

    constructor(namespace: string = 'LEMON', options: any = {}) {
        this.eventEmitter = new EventEmitter();
        this.colorService = new ColorService();
        this.namespace = namespace;
        this.options = { ...this.options, ...options };
    }

    public log(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog(LogType.DEBUG, formattedMessage);
    }

    public debug(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog(LogType.DEBUG, formattedMessage);
    }

    public warn(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog(LogType.WARN, formattedMessage);
    }

    public info(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog(LogType.INFO, formattedMessage);
    }

    public error(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog(LogType.ERROR, formattedMessage);
    }

    private writeLog(type: LogType, message: string) {
        const format: FormatInterface = this.getFormat(type);
        const { timestampFormat, textFormat, typeFormat, namespaceFormat } = format;
        const formattedText = this.createLogMessage(type, message, format);

        if (isNode) {
            console.log(formattedText);
            this.eventEmitter.emit('data', this.namespace, type, message);
        } else {
            // isBrowser
            if (type === LogType.ERROR) {
                console.error(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            } else {
                console.log(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            }
        }

        const shouldSaveLog = this.options.shouldSave && !this.options.endpoint;
        if (shouldSaveLog) {
            this.sendLogMessage(type, message);
        }
        return;
    }

    // TODO: add request
    private sendLogMessage(type: LogType, message: string) {
        const { endpoint } = this.options;
        const defaultFormat: FormatInterface = {
            timestampFormat: '',
            typeFormat: '',
            namespaceFormat: '',
            textFormat: ': '
        };
        const unformattedText = this.createLogMessage(type, message, defaultFormat);
        // http.post(endpoint, ...);
        // console.log(endpoint, unformattedText)
    }

    private getFormat(type: LogType): FormatInterface {
        if (isNode) {
            return this.getNodeFormat(type);
        }
        // isBrowser
        return this.getBrowserFormat(type);
    }

    private getNodeFormat(type: LogType): FormatInterface {
        const whiteColor = this.colorService.getColorByName('White');
        const typeColor = this.colorService.getColorAsType(type);
        const greyColor = this.colorService.getColorByName('Grey');

        const timestampFormat = '\u001b[3' + greyColor + 'm';
        const typeFormat = '\u001b[3' + typeColor + ';22m';
        const namespaceFormat = '\u001b[3' + whiteColor + ';1m';
        const textFormat = '\u001b[0m: ';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    private getBrowserFormat(type: LogType): FormatInterface {
        const whiteColor = this.colorService.getColorByName('White');
        const typeColor = this.colorService.getColorAsType(type);
        const greyColor = this.colorService.getColorByName('Grey');

        const timestampFormat = 'color:' + greyColor;
        const typeFormat = 'color:' + typeColor;
        const namespaceFormat = 'color:' + whiteColor + '; font-weight: bold';
        const textFormat = ': ';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    private createLogMessage(type: LogType, text: string, format: FormatInterface) {
        const typeBlank = (type === LogType.INFO || type === LogType.WARN) ? ' ' : '';
        let { timestampFormat, typeFormat, textFormat, namespaceFormat } = format;

        if (isBrowser) {
            timestampFormat = '%c';
            typeFormat = '%c';
            namespaceFormat = '%c';
            textFormat = ': %c';
        }

        const { showTimestamp, showLogType } = this.options;
        const timestampLog = showTimestamp ? `${timestampFormat}${this.createTimestamp(new Date())} ` : '';
        const typeLog = showLogType ? `${typeFormat}[${type}]${typeBlank} ` : '';
        const namespaceLog = `${namespaceFormat}${this.namespace}`;
        const textLog = `${textFormat}${text}`;
        return `${timestampLog}${typeLog}${namespaceLog}${textLog}`;
    }

    //! timestamp like 2016-12-08 13:30:44 @lemon-engine
    private createTimestamp(date: Date) {
        const zeroOrNull = (text: number) => text < 10 ? '0' : '';
        const dt = date || new Date();
        const [year, month, day, hours, minutes, seconds] = [
            dt.getFullYear(),
            dt.getMonth() + 1,
            dt.getDate(),
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
        ];

        const dateText = `${zeroOrNull(year)}${year}-${zeroOrNull(month)}${month}-${zeroOrNull(day)}${day}`;
        const hoursText = `${zeroOrNull(hours)}${hours}:${zeroOrNull(minutes)}${minutes}:${zeroOrNull(seconds)}${seconds}`;
        return `${dateText} ${hoursText}`
    }
}
