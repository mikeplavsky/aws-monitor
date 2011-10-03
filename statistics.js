var aws = require('aws-lib');

module.exports = function get_metrics_statistics(opts,instance) {

  var acw = aws.createEC2Client(

    opts.access_key_id, 
    opts.secret_access_key,
    {
      'version' : '2010-08-01',
      'host': 'monitoring.amazonaws.com'
    }

  );

  acw.call( 
    'GetMetricStatistics', 
    {
      'Namespace': 'AWS',
      'Service': 'EC2',
      'MetricName': 'CPUUtilization',
      'StartTime': '2011-10-01',
      'EndTime': '2011-10-03',
      'Period': '600',
      'Statistics.member.1' : 'Maximum',
      'MetricData.member.1.Dimensions.member.1.Name': 'InstanceID',
      'MetricData.member.1.Dimensions.member.1.Value': 'instance.InstanceID'
    },
    function(res) {
      console.log(res);
    }
  );
}
