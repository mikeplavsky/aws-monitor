#!/usr/bin/node

var _ = require('underscore');
var describe_instances = require('./aws-core.js');

var fs = require('fs');
var opts = JSON.parse(fs.readFileSync('config.json', 'utf8'));

_.each(opts, function(opt){
  
  var res = describe_instances(opt);

  res.on( 'error', function(err) {
    console.log(opt.account,err);
  });
  
  res.on( 'data', function(i) {

    console.log(

      opt.account,
      i.instanceId,
      i.instanceType,
      i.instanceLifecycle
    
    );

  });

});
