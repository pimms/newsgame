include_once(["metrics.js"]);

function displayHighScore(score, metrics) {
	$("#highscore").css("visibility", "visible");
	
	function reloadScores() {
		$.get("http://gtl.hig.no/displayScore.php?GameID=1", function(scores) {
			console.log(scores);
		});	
	}
}