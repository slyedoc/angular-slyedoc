//How to run:
//  Note: Must have java  JRE installed.
//  Run the following 3 commands the first time:
//          npm install protractor -g
//          npm update
//          npm run update-webdriver
//          NOTE: Bower may warn you on this step about anonymous usage collection.  Pressing Enter -> N -> Enter will
//              take care of this.
//      Create a Run Configuration:
//      Type: node.js
//      Name: Protractor
//      Change 2 settings
//          Javascript file: node_modules\protractor\lib\cli.js
//          Application parameters: test/protractor-conf.js
//
//      Do the following command every time you start webstorm and want to run protractor tests
//      Open a new console, I would do this in a new one because it will be running the entire time
//          npm start
//
//      This starts a webserver that protractors will use running on port 8000
//
//      Run the protractor configuration


//elementexplorer

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e/**/*.js'
        //'e2e/accounts-list.js'
        //'e2e/components/breadcrumbs.js'
        //'e2e/states.js'
    ],

    exclude: [
        'e2e/e2eHelper.js'
    ],

    capabilities: {
        browserName: 'chrome'
//        shardTestFiles: true,
//        maxInstances: 3
    },

    baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }

};
