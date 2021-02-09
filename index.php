<?php
	
	$pathLogFile = "./gisserver.20190301.log";
			$dates_arr = array();
			$users_arr = array();
			$date = "";			
	if (file_exists($pathLogFile)){
		if (($lines = file($pathLogFile)) !== FALSE) {
			
			print ("file exist count lines is ".count($lines)."<br>" );

			$result = "";

			foreach ($lines as $line){
				$now_date = get_date($line);
				if (!empty($now_date)){
					if ($now_date != $date){
						if ($date != ""){
							//create array date
							$arr_date = array($date => $users_arr);
							//merge arrays
							$dates_arr = array_merge ($dates_arr, $arr_date);
							
						}
						$date = $now_date;
						//print_r($users_arr);
						unset($users_arr);
						$users_arr = array();
						//print("<br><b> date = $date</b><br>");
					}
				}
				$user = get_registered_users($line);
				if (!empty($user)){
					$users_arr = add_in_users_array($users_arr, $user);
					//print("User is -- $user <br>");
				}	
			}
			//print_r($dates_arr);
			//print ("<br>");
			//print_r(array_keys($dates_arr));
			
			//print("<br><b> date = $date</b><br>");
			//print_r($users_arr);
			//add end date because for is end
			//create array date
			$arr_date = array($date => $users_arr);
			//merge arrays
			$dates_arr = array_merge ($dates_arr, $arr_date);			
			
			print (print_table($dates_arr));
		}
		

	}
	else {
		print ("File does not exist");
	}

	function print_table($array){
		$dates = array_keys($array);
		$values = array_values($array);
		$users = array();
		foreach($values as $value){
			if (is_array($value)){
				$value_keys = array_keys($value);
				foreach($value_keys as $key){
					$users = add_in_array($users, $key);
				}
			}
		}
		//print ("<br>");
		//print_r($users);
		$table_header = "<tr><th>User</th>";
		foreach($dates as $date){
			$table_header = $table_header."<th>$date</th>";
		}
		$table_header = $table_header."</tr>";
		$table_body = "";
		foreach($users as $user){
			$table_body = $table_body."<tr><td>$user</td>";
			foreach($dates as $date){
				$count = $array[$date][$user];
				$table_body = $table_body."<td>$count</td>";
			}
			$table_body = $table_body."</tr>";
		}
		
		
		$result = "<table border=1px>";
		$result = $result.$table_header.$table_body;
					
					
					
		$result = $result."</table>";
		return $result;
	}
	
	function add_in_users_array($users_arr, $user){
		if (array_key_exists($user, $users_arr)){
			$users_arr[$user] = $users_arr[$user] + 1;
			return $users_arr;
		}
		else {
			$arr_user = array( $user => 1);
			return array_merge($users_arr, $arr_user);
		}
	}
	
	
	
	function get_date($line){
		$date = "";
		$regexDate = '/(\d{4})\-((([0]\d)|1[0-2])\-(([0-2]\d)|(3[01])))/';
		preg_match($regexDate,$line,$r_date);
		if (!empty($r_date[0])){
			$date = $r_date[0];
			//print("date is -- $date <br>");
		}	
		return $date;
	}

	function get_registered_users($line){
		$regex_user_line = '/     (\d{2}):(\d{2}):(\d{2})   \[(\d{3})\] Registration of the user. User = [0-9A-Za-z_-]*/';
		$regex_user = '/\s= /';
		$user = "";
		$elements = array();
		preg_match($regex_user_line, $line, $r_user_line);
		if (!empty($r_user_line[0])){
			//print($r_user_line[0]);
			//print("<br>");
			$elements = preg_split($regex_user, $r_user_line[0]);
			if (!empty($elements)){
				$user = $elements[1];
				//print("User is -- $user <br>");
			}
		}
		return $user;
	} 
	
	function add_in_array($list, $value){
		if (!in_array($value,$list)){
			array_push($list,$value);
		}
		return $list;
	}
?>