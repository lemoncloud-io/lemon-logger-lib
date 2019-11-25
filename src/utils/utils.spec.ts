import SpyInstance = jest.SpyInstance;
import { UtilsService, NODE_COLORS } from './index';
import { LogType } from '../logger';

describe('UtilsService', () => {
    let utils: UtilsService;

    beforeEach(() => {
        const spyGetColorSet: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'getColorSet'); // for private function test
        utils = new UtilsService();
        expect(spyGetColorSet).toHaveBeenCalled();
    });

    it('tests formatMessage()', () => {
        const testParams = ['test', { testObj: 'test' }, 'abcde'];
        const expectResult = `test message test { testObj: 'test' } abcde`;

        const spyCheckErrorInstance: SpyInstance = jest.spyOn(UtilsService.prototype as any, 'checkErrorInstance');
        const result = utils.formatMessage('test message', testParams);

        expect(spyCheckErrorInstance).toHaveBeenCalled();
        expect(spyCheckErrorInstance).toHaveBeenCalledWith(testParams);
        expect(result).toEqual(expectResult);
    });

    it('tests formatMessage() with Error', () => {
        const testParams = [new Error('custom Error')];
        const result = utils.formatMessage('test message', testParams);
        expect(result).toContain('custom Error');
    });

    it('tests getColorAsType()', () => {
        const debugType: LogType = LogType.DEBUG;
        expect(utils.getColorAsType(debugType)).toEqual(NODE_COLORS.Blue);
        const errorType: LogType = LogType.ERROR;
        expect(utils.getColorAsType(errorType)).toEqual(NODE_COLORS.Red);
        const infoType: LogType = LogType.INFO;
        expect(utils.getColorAsType(infoType)).toEqual(NODE_COLORS.Green);
        const warnType: LogType = LogType.WARN;
        expect(utils.getColorAsType(warnType)).toEqual(NODE_COLORS.Yellow);
    });

    it('tests getColorByName()', () => {
        expect(utils.getColorByName()).toEqual(NODE_COLORS.Grey);
        expect(utils.getColorByName('Black')).toEqual(NODE_COLORS.Black);
        expect(utils.getColorByName('Red')).toEqual(NODE_COLORS.Red);
        expect(utils.getColorByName('Green')).toEqual(NODE_COLORS.Green);
        expect(utils.getColorByName('Yellow')).toEqual(NODE_COLORS.Yellow);
        expect(utils.getColorByName('Blue')).toEqual(NODE_COLORS.Blue);
        expect(utils.getColorByName('Magenta')).toEqual(NODE_COLORS.Magenta);
        expect(utils.getColorByName('Cyan')).toEqual(NODE_COLORS.Cyan);
        expect(utils.getColorByName('Grey')).toEqual(NODE_COLORS.Grey);
        expect(utils.getColorByName('White')).toEqual(NODE_COLORS.White);
    });

    it('tests isBrowser()', () => {
        expect(utils.isBrowser()).toBeFalsy();
    });

    it('tests isNode()', () => {
        expect(utils.isNode()).toBeTruthy();
    });

    it('tests checkErrorInstance()', () => {
        const testParams = ['test', { testObj: 'test' }, 'abcde'];
        // to test private function
        expect(utils['checkErrorInstance'](testParams)).toEqual(testParams);
    });
});
