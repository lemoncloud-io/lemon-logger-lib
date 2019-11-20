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
