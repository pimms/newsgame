include_once(["metrics.js"]);


/* Global final score */
var global_score = 0;

function reloadScores(firstScore) {
	if(typeof(firstScore)==='undefined') firstScore=0;

	console.log("Reloading scores...");
	$.get("proxyhs.php?url=http://gtl.hig.no/displayScore.php&from="+firstScore+"&num=10", function(scores) {
		var array = $.trim(scores).split(" ");
		if (array.length >= 3) {
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

			/* Add buttons */
			list.append('<button onclick="reloadScores(' + Math.max(firstScore-10,0) + ')">Minus</button>');
			list.append('<button onclick="reloadScores(' + (firstScore+10) + ')" style="float:right;">Pluss</button>');
		}
	});	
}

function uploadScore(username) {
	username.replace(" ", "%20");
	var url = "proxyhs.php?url=http://gtl.hig.no/logScore.php&User="+username;
	url += "&Score=" + global_score;
	url += "&Hash=" + CryptoJS.MD5(username + global_score + "spicegirls");
	
	console.log("Uploading score to: " + url);
	
	$.get(url, function(result) {
		console.log(result);
		reloadScores();
	});
}

function submitScore() {
	var name = $("#usernameinput").val();

	rePattern = /^[a-zA-Z]{3,}$/;
	if (rePattern.test(name)) {
		uploadScore(name);
		$("#highscore .gameoverlay").append('<button onClick = "restartGame()" visibility="hidden"> Nytt spill </button>');
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
							  "<br> &nbsp&nbsp&nbspPresisjonsbonus * "+ this.scoreMultiplier + 
							  "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsppoengsum = " +score+ "</h3>");
}