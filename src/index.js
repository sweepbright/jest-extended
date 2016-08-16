var webpack = require('webpack');

module.exports = function (config, basePath) {
    if (typeof basePath === 'undefined') {
        basePath = 'tests';
    }

    var coverage = process.argv.indexOf('--coverage') !== -1;
    var coveragePath = basePath + '/_coverage';

    var reporters = ['mocha'];
    if (coverage) {
        reporters.push('coverage');
    } else if (process.env.CIRCLE_TEST_REPORTS) {
        reporters.push('junit');
    }

    config.set({

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            basePath + '/index.js',
        ],

        exclude: [
            coveragePath + '/**/*',
        ],

        webpack: {
            devtool: coverage ? 'inline-source-map' : false,
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
                        loader: 'babel',
                        query: {
                            plugins: coverage ? ['istanbul'] : [],
                        },
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
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
        },

        webpackMiddleware: {
            noInfo: true,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,

        mochaReporter: {
            showDiff: true,
        },

        coverageReporter: {
            type: 'html',
            dir: coveragePath,
        },

        junitReporter: {
            outputDir: process.env.CIRCLE_TEST_REPORTS,
            outputFile: 'karma.xml',
            useBrowserName: false,
            nameFormatter: undefined,
            classNameFormatter: undefined
        },

        browsers: ['Chrome'],
        browserNoActivityTimeout: 20000,
    });

    // Set preprocessors
    config.preprocessors[basePath + '/index.js'] = ['webpack'];

    return config;
};
