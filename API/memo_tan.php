<?php
/*
* chrome_extensionから英単語を受け取るので、
* DBに保存する。
* 
*/
require_once 'tool.php';

if(!isset($_GET))
	die('NO REQUEST');

$db = new Database();
$tango = $db->h($_GET['tango']);
$imi = $db->h($_GET['imi']);
echo $db->insertTango($tango,$imi);
	
?>