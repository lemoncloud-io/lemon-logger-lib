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
