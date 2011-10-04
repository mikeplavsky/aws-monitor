var aws = require('aws-lib');
var util = require('util');

module.exports = function get_metrics_statistics(opts,instance) {

  var acw = aws.createEC2Client(

    opts.access_key_id, 
    opts.secret_access_key,
    {
      'version' : '2010-08-01',
      'host': 'monitoring.amazonaws.com'
    }

  );

  var start = new Date();
  var end = new Date(start);

  start.setMinutes(start.getMinutes()-10);
  
  acw.call( 
    'GetMetricStatistics', 
    {
      'Namespace': 'AWS/EC2',
      'MetricName': 'CPUUtilization',
      'StartTime': start.toISOString(),
      'EndTime': end.toISOString(),
      'Period': '600',
      'Statistics.member' : 'Average',
      'Dimensions.member.Name': 'InstanceId',
      'Dimensions.member.Value': instance.instanceId,
      'Unit' : 'Percent'
    },
    function(res) {
      console.log(opts.account, instance.instanceId,util.inspect(res,true,null));
    }
  );
}
