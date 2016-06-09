var webpack = require('webpack');

module.exports = function (config, basePath) {
    if (typeof basePath === 'undefined') {
        basePath = 'tests';
    }

    var coveragePath = basePath + '/_coverage';

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
            devtool: 'inline-source-map',
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
        reporters: process.env.CIRCLE_TEST_REPORTS ? ['mocha', 'junit'] : ['mocha', 'coverage'],

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
    });

    // Set preprocessors
    config.preprocessors[basePath + '/index.js'] = ['webpack', 'sourcemap'];

    return config;
};
