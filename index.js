// Karma configuration
// Generated on Thu Mar 10 2016 14:10:35 GMT+0100 (CET)
var webpack = require('webpack');

module.exports = function (config) {
    config.set({

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            'tests/index.js',
        ],

        exclude: [
            'tests/_coverage/**/*',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests/index.js': 'webpack',
        },

        webpack: {
            plugins: [
                new webpack.DefinePlugin({
                    __DEVTOOLS__: true,
                }),
            ],
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loaders: ['babel', 'isparta'],
                    },
                    {
                        test: /\.json$/,
                        loader: 'json',
                    },
                    {
                        test: /\.(svg|css|scss|png)$/,
                        loader: 'null',
                    },
                ],
            },
        },

        webpackMiddleware: {
            noInfo: true,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.CIRCLE_TEST_REPORTS ? ['mocha', 'junit'] : ['mocha', 'coverage'],

        mochaReporter: {
            showDiff: true,
        },

        coverageReporter: {
            type: 'html',
            dir: 'tests/_coverage',
        },

        junitReporter: {
            outputDir: process.env.CIRCLE_TEST_REPORTS,
            outputFile: 'karma.xml',
            useBrowserName: false,
            nameFormatter: undefined,
            classNameFormatter: undefined
        },

        browsers: ['Chrome'],
    });
};
