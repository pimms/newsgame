<?php
if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
$url = 'http://' . str_replace('http://', '', $url); 

$url .= "?GameID=1";

if (isset($_GET["User"])) {
	$url .= "&User=" . $_GET["User"];
}

if (isset($_GET["Score"])) {
	$url .= "&Score=" . $_GET["Score"];
}

if (isset($_GET["Hash"])) {
	$url .= "&Hash=" . $_GET["Hash"];
}

if (isset($_GET["from"])) {
	$url .= "&from=" . $_GET["from"];
}

if (isset($_GET["num"])) {
	$url .= "&num=" . $_GET["num"];
}


echo file_get_contents($url);
?>