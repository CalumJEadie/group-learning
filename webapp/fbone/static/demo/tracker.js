API_ROOT = "http://192.168.56.101:5000/api/"

$(document).ready(function() {
	var urls = []
	$('div.exercise').each(function(index) {
		var exercise = this;
		var h3_before = $(this).prevAll("h3")[0];
		//console.log($(h3_before).attr('id'));
		urls.push($(h3_before).attr('id'));
		//$(exercise).append('<div class="btn-group"><form><button class="btn" formaction="boo.php" type="submit" formmethod="POST">	:)</button><button class="btn">	:|</button><button class="btn">:(</button></form></div>')
	});
	var to_submit_to = build_urls(urls);
	$('div.exercise').each(function(index) {
		$(this).append('<div class="btn-group"><button class="btn" progress="true" formaction="' + to_submit_to[index] + '">I get it!</button><button class="btn" formaction="' + to_submit_to[index] + '" progress="false">What\'s going on?</button><</div>')
	});

	$("button").click(function() {
		var uri = API_ROOT + "task_progress_update/" + $(this).attr('formaction') + "/" + $(this).attr('progress');
		console.log(uri);
		$.ajax({
			type: "GET",
			url: uri,
			sucess: function() {
				console.log('sent');
			}
		})
	});
});

(function poll() {
	setTimeout(function() {
		$.ajax({
			url: "/api/all",
			type: "GET", 
			success: function(data) {
				console.log(data);
			},
			dataType: "json",
			complete: poll,
			timeout: 2000
		})
	}, 1000);
})();

var build_urls = function(array) {
	var counts = {};
	var urls = [];
	for(var i = 0; i < array.length; i++) {
		var obj = array[i];
		counts[obj] = counts[obj] ? counts[obj]+1 : 1;
	}
	for(var key in counts) {
		var val = counts[key];
		for(var i = 0; i < val; i++) {
			urls.push(key + '_' + i);
		}
	}
	return urls;
}
