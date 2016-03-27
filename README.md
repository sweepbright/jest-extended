# Madewithlove Karma configuration

## Usage

**karma.conf.js**
```js
module.exports = function(config) {
    // Returns the Karma config object
    // Optionally set path to tests, defaults to `tests`
    config = require('madewithlove-karma-config')(
        config,
        'tests/karma'
    );

    // Customize additional options
    config.browsers = ['Firefox'];
};

```

**tests/index.js**
```js
const testsContext = require.context(".", true, /Test.js$/);
testsContext.keys().forEach(testsContext);
```
