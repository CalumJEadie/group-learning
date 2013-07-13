/*var data = {
  "flag": "success", 
  "progress": [
    {
      "completed_count": 8, 
      "not_completed_count": 20, 
      "task_label": "functions_with_irb_1"
    },
    {
      "completed_count": 98, 
      "not_completed_count": 2, 
      "task_label": "functions_with_irb_2"
    },
    {
      "completed_count": 5, 
      "not_completed_count": 5, 
      "task_label": "functions_with_irb_3"
    }
  ]
};
*/
var data = {};

(function poll() {
    setTimeout(function() {
        $.ajax({
            url: "http://192.168.2.158:5000/api/cummulative_task_progress_all",
            type: "GET", 
            success: function(the_data) {
                data = the_data;
                console.log(the_data);
                clear_display();
                update_display();
            },
            dataType: "json",
            complete: poll,
            timeout: 2000
        })
    }, 5000);
})();

var clear_display = function() {
    $('div.accordion-group').remove();
}


var update_display = function() {
    for(var key in data.progress) {
        var obj = data.progress[key];
        var accordion = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#' + obj.task_label + '">' + obj.task_label + '</a></div><div id="' + obj.task_label + '" class="accordion-body collapse"><div class="accordion-inner" id="functions_with_irb_1"></div></div></div>' 
        $(accordion).appendTo('.accordion');
        console.log(obj.task_label)
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
                    ['I get it',   obj.completed_count],
                    ['I don\'t get it',       obj.not_completed_count],
                ]
            }]
        });
    };
}

$(document).ready(function(){
    update_display();
}); 
