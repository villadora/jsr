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
Q = require('q'),
log4js = require('log4js'),
jss = require('../lib/index'),
esprima = require('esprima'),
escodegen = require('escodegen')
;


// logger config
log4js.setGlobalLogLevel('WARN');


/** ======================================
 *  Program Start
 * ======================================= */
var argv = optmist.alias('v', 'verbose')
    .usage('Usage: jss [-o|--output file] [-v, --verbose]')
    .describe('show verbose log')
    .alias('o', 'output')
    .describe('output will be written into the file')
    .argv;


if(argv.verbose)
    log4js.setGlobalLogLevel('DEBUG');

if(!argv._.length) {
    console.error("Please provide a input file");
}



var inputFile = argv._[0],
    output_file = argv.output,
    content = fs.readFileSync(inputFile, 'utf-8');


var ast = jss.compile(esprima.parse(content, {range:true, loc:true}), []);
var oupput = escodegen.generate(ast, { format:{}, directive: true });

if(output_file)
    fs.writeFile(output_file, output, function(err) {if(err) throw err;});

