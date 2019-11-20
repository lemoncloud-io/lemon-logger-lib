var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { format } from 'util';
import { EventEmitter } from 'events';
import { isNode } from './detectPlatform';
import { ColorService } from './color';
var LemonLog = /** @class */ (function () {
    function LemonLog(namespace, options) {
        if (namespace === void 0) { namespace = 'LEMON'; }
        if (options === void 0) { options = {}; }
        this.options = {
            shouldSave: true,
        };
        this.eventEmitter = new EventEmitter();
        this.colorService = new ColorService();
        this.namespace = namespace;
        this.options = __assign({}, this.options, options);
    }
    LemonLog.prototype.log = function (message) {
        var extraParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParams[_i - 1] = arguments[_i];
        }
        var formattedMessage = format.apply(void 0, [message].concat(extraParams));
        this.writeLog('DEBUG', formattedMessage);
    };
    LemonLog.prototype.debug = function (message) {
        var extraParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParams[_i - 1] = arguments[_i];
        }
        var formattedMessage = format.apply(void 0, [message].concat(extraParams));
        this.writeLog('DEBUG', formattedMessage);
    };
    LemonLog.prototype.warn = function (message) {
        var extraParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParams[_i - 1] = arguments[_i];
        }
        var formattedMessage = format.apply(void 0, [message].concat(extraParams));
        this.writeLog('WARN', formattedMessage);
    };
    LemonLog.prototype.info = function (message) {
        var extraParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParams[_i - 1] = arguments[_i];
        }
        var formattedMessage = format.apply(void 0, [message].concat(extraParams));
        this.writeLog('INFO', formattedMessage);
    };
    LemonLog.prototype.error = function (message) {
        var extraParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraParams[_i - 1] = arguments[_i];
        }
        var formattedMessage = format.apply(void 0, [message].concat(extraParams));
        this.writeLog('ERROR', formattedMessage);
    };
    LemonLog.prototype.writeLog = function (type, message) {
        var format = this.getFormat(type);
        var timestampFormat = format.timestampFormat, textFormat = format.textFormat, typeFormat = format.typeFormat, namespaceFormat = format.namespaceFormat;
        var formattedText = this.createLogMessage(type, message, format);
        if (isNode) {
            console.log(formattedText);
            this.eventEmitter.emit('data', this.namespace, type, message); // for observer
        }
        else {
            if (type === 'ERROR') {
                console.error(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            }
            else {
                console.log(formattedText, timestampFormat, typeFormat, namespaceFormat, textFormat);
            }
        }
        if (this.options.shouldSave) {
            var unformattedText = this.createLogMessage(type, message);
            // TODO: send log
            // console.log(unformattedText)
        }
        return;
    };
    LemonLog.prototype.getFormat = function (type) {
        var defaultColor = this.colorService.getColorAsType();
        var typeColor = this.colorService.getColorAsType(type);
        if (isNode) {
            return this.getNodeFormat(defaultColor, typeColor);
        }
        // isBrowser
        return this.getBrowserFormat(defaultColor, typeColor);
    };
    LemonLog.prototype.getNodeFormat = function (defaultColor, typeColor) {
        var timestampFormat = '\u001b[3' + defaultColor + 'm';
        var typeFormat = '\u001b[3' + typeColor + ';22m';
        var textFormat = '\u001b[0m: ';
        var namespaceFormat = '\u001b[3' + defaultColor + ';1m';
        return { timestampFormat: timestampFormat, typeFormat: typeFormat, textFormat: textFormat, namespaceFormat: namespaceFormat };
    };
    LemonLog.prototype.getBrowserFormat = function (defaultColor, typeColor) {
        var timestampFormat = 'color:' + defaultColor;
        var typeFormat = 'color:' + typeColor;
        var textFormat = ': ';
        var namespaceFormat = 'color:' + defaultColor + '; font-weight: bold';
        return { timestampFormat: timestampFormat, typeFormat: typeFormat, textFormat: textFormat, namespaceFormat: namespaceFormat };
    };
    LemonLog.prototype.createLogMessage = function (type, text, format) {
        if (format === void 0) { format = null; }
        var timestampFormat = '';
        var typeFormat = '';
        var namespaceFormat = '';
        var textFormat = ': ';
        if (format !== null) {
            timestampFormat = format.timestampFormat;
            typeFormat = format.typeFormat;
            namespaceFormat = format.namespaceFormat;
            textFormat = format.textFormat;
        }
        if (!isNode) {
            timestampFormat = '%c';
            typeFormat = '%c';
            namespaceFormat = '%c';
            textFormat = ': %c';
        }
        var result = '';
        result += '' + this.createTimestamp(new Date()) + ' ';
        result = timestampFormat + result;
        result += typeFormat + '[' + type + ']' + (type === 'INFO' || type === 'WARN' ? ' ' : '') + ' ';
        result += namespaceFormat + this.namespace;
        result += textFormat + text;
        return result;
    };
    //! timestamp like 2016-12-08 13:30:44
    LemonLog.prototype.createTimestamp = function (date) {
        var dt = date || new Date();
        var _a = [
            dt.getFullYear(),
            dt.getMonth() + 1,
            dt.getDate(),
            dt.getHours(),
            dt.getMinutes(),
            dt.getSeconds(),
        ], year = _a[0], month = _a[1], day = _a[2], hours = _a[3], minutes = _a[4], seconds = _a[5];
        return ((year < 10 ? '0' : '') +
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
            seconds);
    };
    return LemonLog;
}());
export { LemonLog };
