<?php
/*
今まで記録したtangoを表示

*/

require_once 'tool_view.php';



?>

<!DOCTYPE html5>
<html lang='ja'>
<head>
	<meta charset='UTF-8'>
	<title>メモタン</title>
	<link rel="stylesheet" type="text/css" href="Library/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="Library/bootstrap/css/bootstrap-responsive.min.css">
	<script type="text/javascript" src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
	<script type="text/javascript" src='Library/bootstrap/js/bootstrap.min.js'></script>
</head>
<body>
	<?php 

		$view = new View('imi_tango_table');

	?>
</body>
</html>