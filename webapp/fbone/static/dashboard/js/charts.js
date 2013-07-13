var data = {
  "flag": "success", 
  "progress": [
    {
      "completed_count": 8, 
      "not_completed_count": 20, 
      "task_label": "functions_with_irb_1"
    },
    {
      "completed_count": 5, 
      "not_completed_count": 2, 
      "task_label": "functions_with_irb_2"
    }
  ]
}

$(document).ready(function(){
    for(var key in data.progress) {
        var obj = data.progress[key];
        var accordion = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">' + obj.task_label + '</a></div><div id="collapseTwo" class="accordion-body collapse"><div class="accordion-inner" id="' + obj.task_label + '"></div></div></div>'
        $(accordion).appendTo('.accordion');
        $(function () {
    $('#' + obj.task_label).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2010'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['I don\'t get it',   obj.completed_count],
                ['I get it',       obj.not_completed_count]
            ]
        }]
    });
});
        console.log(obj.completed_count);
    }
});
