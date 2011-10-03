#!/usr/bin/node

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var describe_instances = require('./aws-core.js');
var get_metrics_statistics = require('./statistics.js');

var res = new EventEmitter();

res.on( 'error', function(opt,err) {
  console.log(opt.account,err);
});

res.on( 'data', function(opt,i) {

  console.log(

    opt.account,
    i.instanceId,
    i.instanceType,
    i.instanceLifecycle
  
  );

  get_metrics_statistics(opt,i);

});

var fs = require('fs');
var opts = JSON.parse(fs.readFileSync('config.json', 'utf8'));

_.each(opts, function(opt){
  describe_instances(opt,res);
});
