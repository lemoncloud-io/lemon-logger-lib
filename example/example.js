'use strict';

const { Logger, UtilsService } = require('../lib');
const logger = new Logger('TEST');
const logger2 = new Logger('LEMON', { showTimestamp: false });
const logger3 = new Logger('LEMON', { showTimestamp: false, showLogType: false });
const utils = new UtilsService();

logger.log('this is log', 'isNode: ', utils.isNode());
logger.warn('this is log', 'isBrowser: ', utils.isBrowser());
logger.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);

logger2.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger2.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger2.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger2.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger2.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);

logger3.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger3.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger3.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger3.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger3.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);

const logger4 = new Logger('LEMON', {
    shouldSend: true,
    httpHost: 'http://localhost:8333',
    httpMethod: 'GET',
    httpPath: '/mock/main-items',
});
logger4.log('this is on node');
logger4.debug('this is on node', 'extra params: ', { abced: 'debug'}, 456534);
logger4.info('this is on node', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger4.warn('this is on node', 'extra params: ', { abced: 'warn'}, 324423);
logger4.error('this is on node', 'extra params: ', { abced: 'error'}, 123123124);

try {
    const _ = JSON.parse('test');
} catch (e) {
    logger4.debug('this is on node', 'error params: ', e);
    logger4.error('this is on node', 'error params: ', e);
}
