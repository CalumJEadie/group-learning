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
      "task_label": "functions_with_irb_1"
    }
  ]
}



$(function () {
    $('#container1').highcharts({
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
                ['I don\'t get it',   45.0],
                ['I get it',       26.8]
            ]
        }]
    });
});

