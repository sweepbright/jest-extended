# Madewithlove Karma configuration

## Usage

**karma.conf.js**
```js
var config = require('madewithlove-karma-config');

module.exports = config;
```

**tests/index.js**
```js
const testsContext = require.context(".", true, /Test.js$/);
testsContext.keys().forEach(testsContext);
```
