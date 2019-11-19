import { format } from 'util';
import { EventEmitter } from 'events';

import { isNode, isBrowser } from './detectPlatform';
import { ColorService } from './color';

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

export class LemonLog implements LogInterface {
    private eventEmitter: EventEmitter;
    private colorService: ColorService;
    private namespace: string;
    private options = {
        shouldSave: true,
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
        this.writeLog('DEBUG', formattedMessage);
    }

    public debug(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog('DEBUG', formattedMessage);
    }

    public warn(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog('WARN', formattedMessage);
    }

    public info(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog('INFO', formattedMessage);
    }

    public error(message: string, ...extraParams: any[]) {
        const formattedMessage = format(message, ...extraParams);
        this.writeLog('ERROR', formattedMessage);
    }

    private writeLog(type: 'DEBUG' | 'WARN' | 'INFO' | 'ERROR', message: string) {
        const format: FormatInterface = this.getFormat(type);
        const { timestampFormat, textFormat, typeFormat, namespaceFormat } = format;
        const formattedText = this.createLogMessage(type, message, format);

        if (isNode) {
            console.log(formattedText);
            this.eventEmitter.emit('data', this.namespace, type, message);
        } else {
            if (type === 'ERROR') {
                console.error(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            } else {
                console.log(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            }
        }

        if (this.options.shouldSave) {
            const defaultFormat: FormatInterface = {
                timestampFormat: '',
                typeFormat: '',
                namespaceFormat: '',
                textFormat: ': '
            };
            const unformattedText = this.createLogMessage(type, message, defaultFormat);
            // TODO: add request
            console.log(unformattedText)
        }
        return;
    }

    private getFormat(type: 'DEBUG' | 'WARN' | 'INFO' | 'ERROR'): FormatInterface {
        const defaultColor = this.colorService.getColorAsType();
        const typeColor = this.colorService.getColorAsType(type);

        if (isNode) {
            return this.getNodeFormat(defaultColor, typeColor);
        }
        // isBrowser
        return this.getBrowserFormat(defaultColor, typeColor);
    }

    private getNodeFormat(defaultColor: string, typeColor: string): FormatInterface {
        const timestampFormat = '\u001b[3' + defaultColor + 'm';
        const typeFormat = '\u001b[3' + typeColor + ';22m';
        const textFormat = '\u001b[0m: ';
        const namespaceFormat = '\u001b[3' + defaultColor + ';1m';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    private getBrowserFormat(defaultColor: string, typeColor: string): FormatInterface {
        const timestampFormat = 'color:' + defaultColor;
        const typeFormat = 'color:' + typeColor;
        const textFormat = ': ';
        const namespaceFormat = 'color:' + defaultColor + '; font-weight: bold';

        return { timestampFormat, typeFormat, textFormat, namespaceFormat };
    }

    private createLogMessage(type: 'DEBUG' | 'WARN' | 'INFO' | 'ERROR', text: string, format: FormatInterface) {
        let { timestampFormat, typeFormat, textFormat, namespaceFormat } = format;

        if (isBrowser) {
            timestampFormat = '%c';
            typeFormat = '%c';
            namespaceFormat = '%c';
            textFormat = ': %c';
        }

        let result = '';
        result += '' + this.createTimestamp(new Date()) + ' ';
        result = timestampFormat + result;
        result += typeFormat + '[' + type + ']' + (type === 'INFO' || type === 'WARN' ? ' ' : '') + ' ';
        result += namespaceFormat + this.namespace;
        result += textFormat + text;
        return result;
    }

    //! timestamp like 2016-12-08 13:30:44
    private createTimestamp(date: Date) {
        const dt = date || new Date();
        const [year, month, day, hours, minutes, seconds] = [
            dt.getFullYear(),
            dt.getMonth() + 1,
            dt.getDate(),
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
        ];
        return (
            (year < 10 ? '0' : '') +
            year +
            '-' +
            (month < 10 ? '0' : '') +
            month +
            '-' +
            (day < 10 ? '0' : '') +
            day +
            ' ' +
            (hours < 10 ? '0' : '') +
            hours +
            ':' +
            (minutes < 10 ? '0' : '') +
            minutes +
            ':' +
            (seconds < 10 ? '0' : '') +
            seconds
        );
    }
}
