include_once(["metrics.js"]);


/* Global final score */
var global_score = 0;

function reloadScores() {
	$.get("proxyhs.php?url=http://gtl.hig.no/displayScore.php?GameID=1", function(scores) {
		var array = $.trim(scores).split(" ");
		
		var list = $("#listwrapper");
		list.empty();
		list.append('<table width="100%">');
		
		var table = $("#listwrapper table");
		table.append('<tr><td width="10%"><b>Plass</b></td><td><b>Navn</b></td><td><b>Score</b></td></tr>');
		
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

function uploadScore(username) {
	username.replace(" ", "%20");
	var url = "http://gtl.hig.no/logScore.php?GameID=1&User="+username;
	url += "&Score=" + global_score;
	url += "&hash=" + CryptoJS.MD5(username + global_score + "spicegirls");
	
	console.log(url);
	
	$.get("proxyhs.php?url=" + url, function(result) {
		reloadScores();
	});
}

function submitScore() {
	var name = $("#usernameinput").val();

	rePattern = /^[a-zA-Z]{3,}$/;
	if (rePattern.test(name)) {
		uploadScore(name);
		$("#highscore .gameoverlay").append('<button onClick = "restartGame()" visibility="hidden"> New game </button>');
	} else {
		var div = $("#usernameerror");
		div.empty();
		div.append('<p style="color:#FF0000">Kun bokstaver, minst 3!</p>');
	}
}

function calculateScore(rawScore, metrics) {
	var precision = 0;
	for ( var i = 0 ; i<5 ; i++) {
		precision += (Math.abs(1-metrics.bars[i].current/metrics.bars[i].target));
	}
	this.scoreMultiplier = Math.floor(1 + 75/(Math.pow(3, precision)));
	
	global_score = rawScore * this.scoreMultiplier;
	global_score = Math.floor(global_score);
	return global_score;
}

function displayHighScore(rawScore, metrics) {
	$("#highscore").css("visibility", "visible");
	
	var score = calculateScore(rawScore, metrics);
	$("#listwrapper").prepend("<h3> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsppoeng : " + rawScore + 
							  "<br> Presisjons Bonus * "+ this.scoreMultiplier + 
							  "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsppoengsum = " +score+ "</h3>");
}