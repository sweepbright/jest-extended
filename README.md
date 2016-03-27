# Madewithlove Karma configuration

## Usage

**karma.conf.js**
```js
var config = require('madewithlove-karma-config');

// Optionally specify path to tests, defaults to `tests`
module.exports = config('tests/karma');
```

**tests/index.js**
```js
const testsContext = require.context(".", true, /Test.js$/);
testsContext.keys().forEach(testsContext);
```
