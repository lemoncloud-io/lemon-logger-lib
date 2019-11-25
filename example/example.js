'use strict';
const { Logger } = require('../lib');

const logger = new Logger('TEST');
logger.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);

const logger2 = new Logger('LEMON', { showTimestamp: false });
logger2.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger2.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger2.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger2.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger2.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);

const logger3 = new Logger('LEMON', { showTimestamp: false, showLogType: false });
logger3.log('this is log', 'extra params: ', { abced: 'asdas'}, 456456);
logger3.debug('this is debug = log', 'extra params: ', { abced: 'debug'}, 456534);
logger3.info('this is info', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger3.warn('this is warn', 'extra params: ', { abced: 'warn'}, 324423);
logger3.error('this is error', 'extra params: ', { abced: 'error'}, 123123124);
try {
    const _ = JSON.parse('test');
} catch (e) {
    logger3.debug('this is on nod6e', 'error params: ', e);
    logger3.error('this is on node7', 'error params: ', e);
}

const logger4 = new Logger('LEMON4', {
    shouldSend: true,
    httpHost: 'http://localhost:8333',
    httpMethod: 'POST',
    httpPath: '/mock/log',
});
logger4.log('this is on node1');
logger4.debug('this is on node2', 'extra params: ', { abced: 'debug'}, 456534);
logger4.info('this is on node3', 'extra params: ', { abced: 'info'}, 45645, { asdasd: 'asdsd' });
logger4.warn('this is on node4', 'extra params: ', { abced: 'warn'}, 324423);
logger4.error('this is on nod5e', 'extra params: ', { abced: 'error'}, 123123124);

logger4.setOptions({ shouldSend: false });
logger4.warn('should not be sended log 1');
logger4.warn('should not be sended log 2');
logger4.warn('should not be sended log 3');
logger4.warn('should not be sended log 4');

logger4.setOptions({ shouldSend: true });
logger4.info('sended log 1');
logger4.info('sended log 2');
logger4.info('sended log 3');
logger4.info('sended log 4');
logger4.info('sended log 5');

const logger5 = new Logger('LEMON5', {
    shouldSend: true,
    httpHost: 'http://localhost:8333',
    httpMethod: 'POST',
    httpPath: '/mock/log',
    useSocket: true,
    socketHost: 'http://localhost:5555',
    socketEvent: 'LEMON5',
});
logger5.info('sended log 1 with socket');
logger5.info('sended log 2 with socket');
logger5.info('sended log 3 with socket');
logger5.info('sended log 4 with socket');
logger5.info('sended log 5 with socket');

logger5.setOptions({ useSocket: false });
logger5.warn('nonono log 1 with socket');
logger5.warn('nonono log 2 with socket');
logger5.warn('nonono log 3 with socket');
logger5.warn('nonono log 4 with socket');

setTimeout(() => {
    logger5.setOptions({ useSocket: true });
    logger5.info('1sended log 1 with socket');
    logger5.info('2sended log 2 with socket');
    logger5.info('3sended log 3 with socket');
    logger5.info('4sended log 4 with socket');
    logger5.info('5sended log 5 with socket');
    logger5.closeSocket();
}, 3000);

