<?php
/*
* chrome_extensionから英単語を受け取るので、
* DBに保存する。
* 
*/
require_once 'tool.php';

$locate = "http://localhost:8888/chrome/memo_tan/VIEW/index.php";

if(!isset($_GET))
	die('NO REQUEST');

$db = new Database();
$tango = $db->h($_GET['tango']);
$imi = $db->h($_GET['imi']);
if(!$db->insertTango($tango,$imi))
	$locate .= "?m=AlreadyMemo";

header("Location:$locate");

?>