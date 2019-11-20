import { isBrowser } from './detectPlatform';
export var NODE_COLORS = {
    Black: 0,
    Red: 1,
    Green: 2,
    Yellow: 3,
};
export var BROWSER_COLORS = {
    Black: 'Black',
    Red: 'IndianRed',
    Green: 'LimeGreen',
    Yellow: 'Orange',
};
var ColorService = /** @class */ (function () {
    function ColorService() {
        this.colorSet = this.getColorSet();
        this.logColors = {
            DEBUG: this.colorSet.Black,
            INFO: this.colorSet.Green,
            WARN: this.colorSet.Yellow,
            ERROR: this.colorSet.Red,
            DEFAULT: this.colorSet.Black,
        };
    }
    ColorService.prototype.getColorAsType = function (type) {
        if (type === void 0) { type = 'DEFAULT'; }
        return this.logColors[type];
    };
    ColorService.prototype.getColorSet = function () {
        return isBrowser ? BROWSER_COLORS : NODE_COLORS;
    };
    return ColorService;
}());
export { ColorService };
