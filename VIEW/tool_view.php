<?php

require_once '../API/tool.php';

class View{

	function __construct($mode){

		switch ($mode) {
			case 'imi_tango_table':
				$this->imi_tango_table();
				break;
			
			default:
				# code...
				echo "test";
				break;
		}
	}

	private function imi_tango_table(){

		print_r("
				<table class='table table-striped table-bordered table-hover'>
					<tr>
						<th>ID</th>
						<th>単語</th>
						<th>意味</th>
					<tr>
				");

		$db = new Database();
		$resource = $db->selectFromMemoTan();
		while($row = mysql_fetch_array($resource)){
			print_r("
				<tr>
					<td>".$row['id']."</td>
					<td>".$row['tango']."</td>
					");
			if(strcasecmp('',$row['imi']) === 0)
				echo "<td><input type='text'><input type='submit' class='button'></td>";
			else
				echo "<td>".$row['imi']."</td>";
			
			echo "</tr>";
		}

		print_r("</table");
	}

}

?>