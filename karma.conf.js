// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma'),
            require('karma-scss-preprocessor')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        compilerOptions: {
            sourceMap: true,
            inlineSourceMap: false
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        files: [
            './node_modules/font-awesome/css/font-awesome.css',
            './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
            './src/styles/ag-grid/ag-grid.css',
            './src/styles/ag-grid/theme-material.css',
            './src/styles/app.scss'
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli'],
            './src/styles/app.scss': ['scss']
        }
    });
};
