<?php

function getHttp($url) {
	// curl?
}

function postScore() {
	$name = $_POST["name"];
	$score = $_POST["score"];
	$hash = $_POST["hash"];

	$localHash = md5($name + $score + "SPICEGIRLS");
	if ($localHash != $hash) {
		die("haxx0r");
	}

	$url = "http://gtl.hig.no/logScore.php?User=";
	$url .= $name;
	$url .= "&Score=" + $score + "&GameID=1";

	getHttp($url);
}

function displayScore() {
	$scoreString = getHttp("http://gtl.hig.no/displayScore.php?GameID=1");

	// Do something with it 
}

	

/***** Script Execution Entry *****/
if (isset($_POST["name"]) &&
	isset($_POST["score"])) {
	postScore();
}



?>