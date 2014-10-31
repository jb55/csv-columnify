#!/usr/bin/env node

require('epipebomb')();

var csv = require('csv-parser');
var columnify = require('columnify');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var separator = argv.delimiter || argv.separator || argv.d || argv.s || ',';
var keys = [];
var items = [];
var srcFile = argv._ && argv._[0];

var source = srcFile ? fs.createReadStream(srcFile) : process.stdin;

source
.pipe(csv({ separator: separator }))
.on('data', function(obj){
  if (!keys) keys = Object.keys(obj);
  items.push(obj);
})
.on('end', function() {
  console.log(columnify(items));
});
