import { isBrowser } from './detectPlatform';

export const NODE_COLORS = {
    Black: 0,
    Red: 1,
    Green: 2,
    Yellow: 3,
};

export const BROWSER_COLORS = {
    Black: 'Black',
    Red: 'IndianRed',
    Green: 'LimeGreen',
    Yellow: 'Orange',
};

export class ColorService {
    private colorSet: any;
    private logColors: any;

    constructor() {
        this.colorSet = this.getColorSet();
        this.logColors = {
            DEBUG: this.colorSet.Black,
            INFO: this.colorSet.Green,
            WARN: this.colorSet.Yellow,
            ERROR: this.colorSet.Red,
            DEFAULT: this.colorSet.Black,
        };
    }

    public getColorAsType(type: 'DEBUG' | 'WARN' | 'INFO' | 'ERROR' | 'DEFAULT' = 'DEFAULT'): string {
        return this.logColors[type];
    }

    private getColorSet() {
        return isBrowser ? BROWSER_COLORS : NODE_COLORS;
    }
}
