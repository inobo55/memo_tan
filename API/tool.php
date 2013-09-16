<?php
/*
クラスや関数群をここに用意する。
使う際にはrequireする。
*/

class Database{

	private $host = 'localhost';
	private $user = 'root';
	private $pass = 'root';
	private $db_name = 'chrome';
	private $table_memo = 'memo_tan';

	private function initMysql(){
		//mySQLの前処理
		mb_language("uni");
		mb_internal_encoding("utf-8");
		mb_http_input("auto");
		mb_http_output("utf-8");
	}

	//データベース接続する際はこの関数を使う。返り値$link。
	private function mysqlConnect(){
		$this->initMySQL();
		$link = mysql_connect($this->host, $this->user,$this->pass);

		if(!$link){
			echo "接続に失敗しました。";
			return FALSE;
		}
		mysql_query("SET NAMES utf8",$link);
		mysql_select_db($this->db_name, $link);
		if(!$link){
			echo "DBが見つかりません。";
			return FALSE;
		}
		return $link;
	}

	//mySQLを操作するときはこの関数を使う
	private function mysqlSelect($sql, $link){
		$result = mysql_query($sql, $link);
		return $result;
	}

	public function selectFromMemoTan(){

		$sql = "SELECT * FROM `chrome`.`memo_tan`;";
		$link = $this->mysqlConnect();
		$resource = $this->mysqlSelect($sql,$link);
		return $resource;
	}

	public function insertTango($tango,$imi=NULL){
		$sql = "INSERT INTO  `chrome`.`memo_tan` (`id` ,`tango` ,`imi`)VALUES (NULL ,  '$tango', '$imi');";
		$link = $this->mysqlConnect();
		return $this->mysqlSelect($sql,$link);
	}

	public function updateImi($imi,$id){
		$sql = "UPDATE `chrome`.`memo_tan` SET `imi` = '$imi' WHERE `id` = $id;";
		$link = $this->mysqlConnect();
		return $this->mysqlSelect($sql,$link);
	}


	public function h($str){
		return htmlspecialchars($str);
	}

}


?>