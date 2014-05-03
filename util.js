'use strict';
var path = require('path');
var fs = require('fs');

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function needleJs() {
    return '<!-- endYeoman -->';
}

function rewrite(args) {
    /* jshint -W044 */
    // check if splicable is already in the body text
    var re = new RegExp(args.splicable.map(function (line) {
        return '\s*' + escapeRegExp(line);
    }).join('\n'));

    if (re.test(args.haystack)) {
        return args.haystack;
    }

    var lines = args.haystack.split('\n');

    var otherwiseLineIndex = 0;
    lines.forEach(function (line, i) {
        if (line.indexOf(args.needle) !== -1) {
            otherwiseLineIndex = i;
        }
    });

    var spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
        spaces += 1;
    }

    var spaceStr = '';
    while ((spaces -= 1) >= 0) {
        spaceStr += ' ';
    }

    lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
        return spaceStr + line;
    }).join('\n'));

    return lines.join('\n');
}

function rewriteFile(args) {
    args.path = args.path || process.cwd();
    var fullPath = path.join(args.path, args.file);

    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = rewrite(args);

    fs.writeFileSync(fullPath, body);
}

function getContext(generator) {

    //not sure why dasherize started adding - at the start, this removes it
    var context = {
        dasherizeName: generator._.dasherize(generator.name).trim('-'),
        cameledName: generator._.camelize(generator.name),
        classedName: generator._.classify(generator.name)
    };
    console.log(context);
    return context;
}

function setupJS(generator, suffix) {
    var context = getContext(generator);

    //build up files
    var dir = "app/components/" + context.dasherizeName;
    generator.mkdir(dir);

    var file = dir + "/" + context.dasherizeName + "-" + suffix + ".js";
    generator.template(suffix + ".js", file, context);

    //add to index
    var fileForHtml = "components/" + context.dasherizeName + "/" + context.dasherizeName + "-" + suffix + ".js";
    addJStoIndex(fileForHtml);
}

function setupJSandTest(generator, suffix) {
    var context = getContext(generator);

    //build up files
    var dir = "app/components/" + context.dasherizeName;
    generator.mkdir(dir);

    var file = dir + "/" + context.dasherizeName + "-" + suffix + ".js";
    var test = dir + "/" + context.dasherizeName + "-" + suffix + "-test.js";

    generator.template(suffix + ".js", file, context);
    generator.template(suffix + "-test.js", test, context);

    //add to index
    var fileForHtml = "components/" + context.dasherizeName + "/" + context.dasherizeName + "-" + suffix + ".js";
    addJStoIndex(fileForHtml);
}

function addJStoIndex(file)
{
    var html = 'app/index.html';
    try {
        rewriteFile({
            file: html,
            needle: needleJs(),
            splicable: [
                    '<script src="' + file.toLowerCase().replace(/\\/g, '/') + '"></script>'
            ]
        });
    } catch (e) {
        console.log('\nUnable to find '.yellow + html + '. Reference to '.yellow + file + '.js ' + 'not added.\n'.yellow);
    }

}

function setupHtml(generator, suffix) {
    var context = getContext(generator);

    //build up files
    var dir = "app/components/" + context.dasherizeName;
    generator.mkdir(dir);

    var html = dir + "/" + context.dasherizeName + ".html";
    generator.template(suffix + ".html", html, context);
}

function setupRoute(generator) {
    var context = getContext(generator);

    //build up files
    var dir = "app/" + context.dasherizeName;
    generator.mkdir(dir);

    var html = dir + "/" + context.dasherizeName + ".html";
    var file = dir + "/" + context.dasherizeName + "-controller.js";
    var test = dir + "/" + context.dasherizeName + "-controller-test.js";

    generator.template("route.html", html, context);
    generator.template("route.js", file, context);
    generator.template("route-test.js", test, context);

    //add route state
    var config = {
        file: 'app/app.js',
        needle: ".state('home'",
        splicable: [
                "    url: '/" + context.dasherizeName + "',",
                "    templateUrl: '" + context.dasherizeName + "/" + context.dasherizeName + ".html',",
                "    controller: '" + context.classedName + "Ctrl'"
        ]
    };
    config.splicable.unshift(".state('" + context.dasherizeName + "', {");
    config.splicable.push("})");
    rewriteFile(config);

    //add file to index
    var fileForHtml = context.dasherizeName + "/" + context.dasherizeName + "-controller.js";
    addJStoIndex(fileForHtml);
}

module.exports = {
    rewrite: rewrite,
    rewriteFile: rewriteFile,
    getContext: getContext,
    needleJs: needleJs,
    setupJS: setupJS,
    setupJSandTest: setupJSandTest,
    setupHtml: setupHtml,
    setupRoute: setupRoute,
    addJStoIndex: addJStoIndex
};
