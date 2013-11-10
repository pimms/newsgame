include_once(["metrics.js"]);

function reloadScores() {
	$.get("proxyhs.php?url=http://gtl.hig.no/displayScore.php?GameID=1", function(scores) {
		var array = $.trim(scores).split(" ");
		
		var list = $("#listwrapper");
		list.empty();
		list.append('<table>');
		
		var table = $("#listwrapper table");
		table.append("<tr><td><b>Plass</b></td><td><b>Navn</b></td><td><b>Score</b></td></tr>");
		
		for (var i=0; i<array.length/3; i++) {
			var row = "<tr>";
			for (var j=0; j<3; j++) {
				row += "<td>" + array[i*3+j] + "</td>";
			}
			row += "</tr>";
			table.append(row);
		}
	});	
}

function displayHighScore(score, metrics) {
	$("#highscore").css("visibility", "visible");
	
	reloadScores();
}