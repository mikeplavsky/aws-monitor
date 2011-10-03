var aws = require ('aws-lib');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

module.exports = function describe_instances(opts) {

  var events = new EventEmitter();
  var ec2 = aws.createEC2Client(opts.access_key_id, opts.secret_access_key, {version:'2011-07-15'});

  ec2.call( "DescribeInstances", 
    
    {"Filter.1.Name": 'instance-state-name', 'Filter.1.Value': 'running'},

    function(res) {

      if (res.Errors) {
        events.emit( 'error', res );
        return;
      }
      
      var items = _.flatten([res.reservationSet.item]);

      if (items[0]) {

        var instances = _.pluck(_.pluck(items,'instancesSet'),'item');

        _.each( instances, function(i) {
            events.emit("data", i);
        });

      }
    }
  );

  return events;

};
