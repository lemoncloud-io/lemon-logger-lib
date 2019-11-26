# lemon-logger-lib

[![Build Status](https://travis-ci.org/lemoncloud-io/lemon-logger-lib.svg?branch=develop)](https://travis-ci.org/lemoncloud-io/lemon-logger-lib)

TypeScript console logger for LemonCloud

## Install

```
$ npm install @lemoncloud/lemon-logger-lib
```

## Usage

### default

```typescript
import { Logger } from '@lemoncloud/lemon-logger-lib';

const logger = new Logger('LEMON');
const logger2 = new Logger('LEMON2', { showTimestamp: false, showLogType: false });

logger.log('this is log', 'extra params: ', { type: 'debug'}); 
logger.debug('this is debug', 'extra params: ', { type: 'debug'});

logger2.info('this is info', 'extra params: ', { type: 'info'});
logger2.warn('this is warn', 'extra params: ', { type: 'warn'});
logger2.error('this is error', 'extra params: ', { type: 'error'}, 'test');
```

### http
```typescript
const logger = new Logger('LEMON', {
    shouldSend: true,
    httpHost: 'http://localhost:8333',
    httpMethod: 'POST',
    httpPath: '/mock/log',
});
```

### socket
```typescript
const logger = new Logger('LEMON', {
    useSocket: true,
    socketHost: 'http://localhost:5555',
    socketEvent: 'LOG',
});
```

## Options

### Logger([namespace], [options])

##### showTimestamp

Type: `boolean`<br>
Default: `true`

##### showLogType

Type: `boolean` <br>
Default: `true`

##### shouldSend

Type: `boolean`<br>
Default: `false`

##### httpHost

Type: `string`<br>
Default: `''`

##### httpMethod

Type: `string`<br>
Default: `''`

##### httpPath

Type: `string`<br>
Default: `''`

##### useSocket

Type: `boolean`<br>
Default: `false`

##### socketHost

Type: `string`<br>
Default: `''`

##### socketEvent

Type: `string`<br>
Default: `''`

## Methods

#### `logger.log('test message')`
#### `logger.debug('test message')`
#### `logger.info('test message')`
#### `logger.warn('test message')`
#### `logger.error('test message')`
#### `logger.setOptions({ shouldSend: false })`
#### `logger.closeSocket()`

## Sample

A quick sample is provided as [example.js](./example/example.js)
