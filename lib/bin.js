#!/usr/bin/env node

var optimist = require("optimist"),
fs = require('fs'),
exists = fs.existsSync,
path = require('path'),
dirname = path.dirname,
basename = path.basename,
extname = path.extname,
join = path.join,
_ = require('underscore'),
log4js = require('log4js'),
jss = require('../lib/index')
;


// logger config
log4js.setGlobalLogLevel('WARN');


/** ======================================
 *  Program Start
 * ======================================= */

module.exports.main = function(jss_opts) {
    var argv = optmist.alias('v', 'verbose')
        .usage('Usage: jss [-o|--output file] [-v, --verbose]')
        .describe('show verbose log')
        .alias('o', 'output')
        .describe('output will be written into the file')
        .argv;

    if(argv.verbose) {
        log4js.setGlobalLogLevel('DEBUG');
    }

    if(!argv._.length) {
        console.error("Please provide a input file");
    }


    var inputFiles = argv._,
    output = "",
    output_file = argv.output;

    for(var i = 0, len = inputFiles.length; i < len; ++i) {
        var inputFile = argv._[i],
        content = fs.readFileSync(inputFile, 'utf-8'),
        ast = jss.compile(content, jss_opts);

        oupput += jss.generate(ast);
    }

    if(output_file)
        fs.writeFile(output_file, output, function(err) {if(err) throw err;});
    else if(!argv.verbose)
        process.stdout.write(output);
};
