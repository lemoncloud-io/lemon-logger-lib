import { LogType } from '../logger';

export const NODE_COLORS = {
    Black: 0,
    Red: 1,
    Green: 2,
    Yellow: 3,
    Blue: 4,
    Magenta: 5,
    Cyan: 6,
    Grey: 7,
    White: 9,
};

export const BROWSER_COLORS = {
    Black: 'Black',
    Red: 'IndianRed',
    Green: 'LimeGreen',
    Yellow: 'Orange',
    Blue: 'RoyalBlue',
    Magenta: 'Orchid',
    Cyan: 'SkyBlue',
    Grey: 'DimGrey',
    White: 'White',
};

export class UtilsService {
    private colorSet: any;
    private logColors: any;

    constructor() {
        this.colorSet = this.getColorSet();
        this.logColors = {
            DEBUG: this.colorSet.Blue,
            INFO: this.colorSet.Green,
            WARN: this.colorSet.Yellow,
            ERROR: this.colorSet.Red,
            DEFAULT: this.colorSet.Black,
        };
    }

    public getColorAsType(type: LogType): string {
        return this.logColors[type];
    }

    public getColorByName(name: string = 'Grey') {
        return this.colorSet[name];
    }

    public isBrowser() {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }

    public isNode() {
      return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }

    private getColorSet() {
        return this.isBrowser() ? BROWSER_COLORS : NODE_COLORS;
    }
}