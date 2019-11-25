import SpyInstance = jest.SpyInstance;
import { Logger, LogType, FormatInterface } from './index';
import { UtilsService } from '../utils';

describe('default Logger', () => {
    let logger: Logger;
    let utils: UtilsService;

    beforeEach(() => {
        const spyIsNode: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'isNode');
        const spyIsBrowser: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'isBrowser');

        const spySetHttpClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setHttpClient');
        const spySetSocketClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setSocketClient');

        logger = new Logger();
        utils = new UtilsService();

        expect(spyIsNode).toHaveBeenCalled();
        expect(spyIsBrowser).toHaveBeenCalled();
        expect(spySetHttpClient).toHaveBeenCalled();
        expect(spySetSocketClient).toHaveBeenCalled();
    });

    it('tests log()', () => {
        const spyWriteLog: SpyInstance = jest.spyOn(Logger.prototype as any, 'writeLog');

        const message = 'test message';
        const params = ['test', { testObj: 'test' }];
        logger.log(message, ...params);

        const formattedMessage = utils.formatMessage(message, params);
        expect(spyWriteLog).toHaveBeenCalledWith(LogType.DEBUG, formattedMessage);
    });

    it('tests debug()', () => {
        const spyWriteLog: SpyInstance = jest.spyOn(Logger.prototype as any, 'writeLog');

        const message = 'debug message';
        const params = ['debug', { testObj: 'debug' }];
        logger.debug(message, ...params);

        const formattedMessage = utils.formatMessage(message, params);
        expect(spyWriteLog).toHaveBeenCalledWith(LogType.DEBUG, formattedMessage);
    });

    it('tests warn()', () => {
        const spyWriteLog: SpyInstance = jest.spyOn(Logger.prototype as any, 'writeLog');

        const message = 'warn message';
        const params = ['warn', { testObj: 'warn' }];
        logger.warn(message, ...params);

        const formattedMessage = utils.formatMessage(message, params);
        expect(spyWriteLog).toHaveBeenCalledWith(LogType.WARN, formattedMessage);
    });

    it('tests info()', () => {
        const spyWriteLog: SpyInstance = jest.spyOn(Logger.prototype as any, 'writeLog');

        const message = 'info message';
        const params = ['info', { testObj: 'info' }];
        logger.info(message, ...params);

        const formattedMessage = utils.formatMessage(message, params);
        expect(spyWriteLog).toHaveBeenCalledWith(LogType.INFO, formattedMessage);
    });

    it('tests error()', () => {
        const spyWriteLog: SpyInstance = jest.spyOn(Logger.prototype as any, 'writeLog');

        const message = 'error message';
        const params = ['error', { testObj: 'error' }];
        logger.error(message, ...params);

        const formattedMessage = utils.formatMessage(message, params);
        expect(spyWriteLog).toHaveBeenCalledWith(LogType.ERROR, formattedMessage);
    });

    it('tests setOptions()', () => {
        const spySetHttpClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setHttpClient');
        const spySetSocketClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setSocketClient');

        logger.setOptions({ httpHost: 'http://localhost', httpMethod: 'POST' });
        expect(spySetHttpClient).toHaveBeenCalled();

        logger.setOptions({ socketHost: 'http://localhost', socketEvent: 'LOGGER' });
        expect(spySetSocketClient).toHaveBeenCalled();
    });

    it('tests closeSocket()', () => {
        const spySetHttpClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setHttpClient');
        const spySetSocketClient: SpyInstance = jest.spyOn(Logger.prototype as any, 'setSocketClient');

        logger.setOptions({ httpHost: 'http://localhost', httpMethod: 'POST' });
        expect(spySetHttpClient).toHaveBeenCalled();

        logger.setOptions({ socketHost: 'http://localhost', socketEvent: 'LOGGER' });
        expect(spySetSocketClient).toHaveBeenCalled();
    });

    it('tests writeLog()', () => {
        const spyGetFormat: SpyInstance = jest.spyOn(Logger.prototype as any, 'getFormat');
        const spyCreateLogMessage: SpyInstance = jest.spyOn(Logger.prototype as any, 'createLogMessage');

        const logType: LogType = LogType.DEBUG;
        const message = 'test message';
        const format: FormatInterface = logger['getFormat'](logType);
        logger['writeLog'](logType, message);

        expect(spyGetFormat).toHaveBeenCalledWith(logType);
        expect(spyCreateLogMessage).toHaveBeenCalledWith(logType, message, format);
    });

    it('tests getUnformattedLogMessage()', () => {
        const spyCreateLogMessage: SpyInstance = jest.spyOn(Logger.prototype as any, 'createLogMessage');

        const logType: LogType = LogType.DEBUG;
        const message = 'test message';
        const defaultFormat: FormatInterface = {
            timestampFormat: '',
            typeFormat: '',
            namespaceFormat: '',
            textFormat: ': ',
        };
        logger['getUnformattedLogMessage'](logType, message);

        expect(spyCreateLogMessage).toHaveBeenCalledWith(logType, message, defaultFormat, false);
    });

    it('tests createLogMessage()', () => {
        const logType: LogType = LogType.DEBUG;
        const message = 'test message';
        const defaultFormat: FormatInterface = {
            timestampFormat: '',
            typeFormat: '',
            namespaceFormat: '',
            textFormat: ': ',
        };
        const logMessage = logger['createLogMessage'](logType, message, defaultFormat);

        expect(logMessage).toContain('[DEBUG]');
        expect(logMessage).toContain('LEMON');
        expect(logMessage).toContain(message);

        const [date, hours, ..._] = logMessage.split(' ');
        const dateReg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;
        expect(dateReg.test(date)).toBeTruthy();

        const hoursReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
        expect(hoursReg.test(hours)).toBeTruthy();
    });

    it('tests getFormat()', () => {
        const spyGetNodeFormat: SpyInstance = jest.spyOn(Logger.prototype as any, 'getNodeFormat');
        const logType: LogType = LogType.DEBUG;
        logger['getFormat'](logType);
        expect(spyGetNodeFormat).toHaveBeenCalledWith(logType);
    });

    it('tests getNodeFormat()', () => {
        const spyGetColorByName: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'getColorByName');
        const spyGetColorAsType: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'getColorAsType');
        const logType: LogType = LogType.DEBUG;

        const format: FormatInterface = logger['getNodeFormat'](logType);
        const { timestampFormat, typeFormat, textFormat, namespaceFormat } = format;

        expect(timestampFormat).toBeDefined();
        expect(typeFormat).toBeDefined();
        expect(textFormat).toBeDefined();
        expect(namespaceFormat).toBeDefined();

        expect(spyGetColorByName).toHaveBeenCalled();
        expect(spyGetColorAsType).toHaveBeenCalled();
    });

    it('tests createTimestamp()', () => {
        const result = logger['createTimestamp'](new Date());
        const [dateStr, hoursStr] = result.split(' ');
        const dateReg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;
        expect(dateReg.test(dateStr)).toBeTruthy();

        const hoursReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
        expect(hoursReg.test(hoursStr)).toBeTruthy();
    });
});
