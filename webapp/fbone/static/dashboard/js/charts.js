var data = {};

(function poll() {
    setTimeout(function() {
        $.ajax({
            url: "/api/cummulative_task_progress_all",
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

var spacesInString = function(task_label) {
    task_label = task_label.replace(/_/g, ' ');
    task_label = task_label.charAt(0).toUpperCase() + task_label.slice(1);

    return task_label;
}

var update_display = function() {
	var series = [];
	var yes = {};
	yes.name = "Completed Yes";
	yes.data = [];
	
	var no = {};
	no.name = "Completed No"
	no.data = [];

	var names = [];

	for (var key in data.progress) {
		var obj = data.progress[key],
		completed = obj.completed_count,
		not_completed = obj.not_completed_count;
		yes.data.push(completed);
		no.data.push(not_completed);
		console.log(obj.task_label);
		names.push(spacesInString(obj.task_label))
	}

	console.log(names)	
	
	series.push(yes);
	series.push(no);

	
	$('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Progress Report'
            },
            xAxis: {
                categories: names
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Students'
                }
            },
	  colors: ['#10d102', 
            '#d10202'
            ],
            legend: {
                backgroundColor: '#FFFFFF',
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
			animation: false
                }
            },
                series: [{name: 'Completed Yes', data: yes.data}, {name: 'Completed No', data: no.data}]
        });	
}

/*
var update_display = function() {
    for(var key in data.progress) {
        var obj = data.progress[key];
        var title = spacesInString(obj.task_label);
	// if exists, don't recreate the div
	if(!($('#' + obj.task_label).exists())) {
		var accordion = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#' + obj.task_label + '">' + obj.task_label + '</a></div><div id="' + obj.task_label + '" class="accordion-body collapse"><div class="accordion-inner" id="functions_with_irb_1"></div></div></div>' 
		$(accordion).appendTo('.accordion');
	}

        console.log(obj.task_label)
        $('#' + obj.task_label).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: title
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
*/

$(document).ready(function(){
    update_display();
}); 
