'use strict';

const { LemonLog } = require('../dist');
const logger = new LemonLog('TEST', {});

logger.debug('test erea', {abced: 'asdas'});
logger.log('log log', {abced: 'asdas'});
logger.info('test erea', {abced: 'asdas'});
logger.info('test erea', {abced: 'asdas'});
logger.info('test erea', {abced: 'asdas'});
logger.log('log log', {abced: 'asdas'});
logger.log('log log', {abced: 'asdas'});
logger.warn('test erea', {abced: 'asdas', asdasd: 1123123, asda: 3423423}, 123124,5645098650);
logger.warn('test erea', {abced: 'asdas', asdasd: 1123123, asda: 3423423}, 123124,5645098650);
logger.warn('test erea', {abced: 'asdas', asdasd: 1123123, asda: 3423423}, 123124,5645098650);
logger.error('test', 123123,12312312312,312321);
logger.error('test', 123123,12312312312,312321);
logger.error('test', 123123,12312312312,312321);
logger.error('test', 123123,12312312312,312321);
