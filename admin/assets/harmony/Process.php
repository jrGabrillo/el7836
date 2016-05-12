<?php
//secure this file
include("Functions.php");
session_start();
$Functions = new DatabaseClasses;

	if(isset($_GET['secure'])){
		$file = "../do not delete.json"; $SystemStatus = 0;
		if($Data = file_get_contents($file)){
		    $Dates = $Functions->PDO_DateAndTime();$Date = date("Y-m-d",strtotime($Dates)); $Status = 0; $Data = json_decode($Data,true); $Dates = [$Date];
		    if((count($Data)>=1) && (count($Data)<=100)){
		        if($Data[0]>$Date)
			        $SystemStatus = 1; //die        	
		    }
		    else
		        $SystemStatus = 1; //die        	

		    foreach ($Data as $key => $value){
		        if(!in_array($value, $Dates))
		            $Dates[] = $value;
		        else
		            $Status = 1;
		    }

		    if($Status !== 1){
		        $OutPut = json_encode($Dates);
		        header('Content-Type: text/plain; charset=utf-8');    
		        $handle = fopen($file,'w+');
		        if(fwrite($handle,$OutPut) && fclose($handle))
			        $SystemStatus = 0;
		        else
			        $SystemStatus = 1; //die        	
		    }
		}
		else
	        $SystemStatus = 1; //die  

	    echo $SystemStatus;      	
	}

	if(isset($_GET['Number'])){
		$Data = $_POST['Data'];
		if($Functions->Number($Data,2)!==1)
			echo 1;
		else
			echo 0;
	}
  
	if (isset($_GET['ValidateDateOfBirth'])) {
		$Data = $_POST['Data'];
		if($Functions->ValidationDOB($Data,1934,2014)!==1)
			echo 1;
		else
			echo 0;
	}

	if (isset($_GET['ValidateAddress'])) {
		$Data = $_POST['Data'];
		if($Functions->ValidationAddress($Data)!==1)
			echo 1;
		else
			echo 0;
	}

	if (isset($_GET['ValidateStudentID'])) {
		$Data = $_POST['Data'];
		if($Functions->ValidationPSUStudentID($Data)!==1)
			echo 1;
		else
			echo 0;
	}

    if (isset($_GET['Get_Voter'])) {
        $Data = $_POST['data'];
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE voter_student_id = '{$Data}'");
        if(count($Query)==1){
	        print_r(json_encode($Query));
        }
        else
            echo 0;
    }

    if (isset($_GET['get-pol-party'])) {
        $pol_party = array();
        $Query = $Functions->PDO_SQL("SELECT candidate_politicalparty FROM tbl_candidate");
        foreach ($Query as $key => $value) {
        	if(!in_array($value[0], $pol_party)){
        		$pol_party[] = $value[0];

        	}
        }
        print_r(json_encode($pol_party));
    }

    if (isset($_GET['get-active-election'])) {
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
        if(count($Query)>0){
	        foreach ($Query as $key => $value) {
	 	        print_r(json_encode($Query));
	        }
        }
        else{
			echo "0";        	
        }
    }

	if (isset($_GET['ValidateContact'])) {
		$Data = $_POST['Data'];
		if($Functions->ValidationMobile($Data)!==1)
			echo 1;
		else
			echo 0;
	}

	if(isset($_GET['AlphaNumeric'])){
	    $Data = $_POST['Data'];
	    if($Functions->AlphaNumeric($Data,50)!==1)
	        echo 1;
	    else
	        echo 0;
	}

	if(isset($_GET['AlphaNumericSpaceDash'])){
	    $Data = $_POST['Data'];
	    if($Functions->AlphaNumeric2($Data,50)!==1)
	        echo 1;
	    else
	        echo 0;
	}

	if(isset($_GET['ValidateName'])){
	    $Data = $_POST['data'];
	    if($Functions->ValidateNames($Data)!==1)
	        echo 1;
	    else
	        echo 0;
    }    

	if(isset($_GET['Login'])){
	    $Data = $_POST['Data'];
	    $password = sha1($Data[0][2]);
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_user WHERE user_name = '{$Data[0][1]}' AND user_password = '{$password}'");
        $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_access WHERE student_id = '{$Data[0][1]}' AND access_passcode = '{$Data[0][2]}'");
	    if(count($Query)==1){
	    	echo 1;
	    	$_SESSION['username'] = $Data[0][1];
	    	$_SESSION['password'] = $password;
	    }
	    else if(count($Query2)==1){
	    	$_SESSION['username'] = $Data[0][1];
	    	$_SESSION['password'] = $Data[0][2];
	    	echo 2;
	    }
	    else{
			echo 0;
	    }
    }    

	if(isset($_GET['check_access'])){
		if(count($_SESSION)>0){
			$username = $_SESSION['username'];
			$password = $_SESSION['password'];
	        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_user WHERE user_name = '{$username}' AND user_password = '{$password}'");
	        $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_access WHERE student_id = '{$username}' AND access_passcode = '{$password}'");
		    if(count($Query)==1){
		        print_r(json_encode($Query));
		    }
		    else if(count($Query2)==1){
		        $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE voter_student_id = '{$username}'");
		    	print_r(json_encode($Query2));
		    }
		    else{
		    	echo 0;
		    }
		}
		else{
	    	echo 0;
		}
    }   

	if(isset($_GET['logout'])){
		if(session_destroy()){
	    	echo 1;
		}
		else{
	    	echo 0;
		}
    }

	if(isset($_GET['test_image'])){
	    header('Content-Type:application/json');
	    $uploaded = array();
	    $succeeded = array();
	    $failed = array();
	    $allowed = ['jpg','jpeg','png','gif'];

	    if(!empty($_FILES['file'])){
	        $name = $_FILES['file']['name'];
	        if($_FILES['file']['error'] == 0){
	            $temp = $_FILES['file']['tmp_name'];
	            $ext = explode('.',$name);
	            $ext = strtolower(end($ext));
	            $file = sha1($temp)."-".time().".".$ext;
	            $succeeded[] = array(
	                'name' => $name,
	                'file' => $file,
	            );
	        }
	        else{
	            $failed[] = array(
	                'name' => $name,
	            );
	        }

	        if(!empty($_POST['ajax'])){
	            echo json_encode(array(
	                'succeeded' => $succeeded,
	                'failed' => $failed
	            ));
	        }
	    }
	    else{
	        $failed[] = array(
	            "Unable to upload the file."
	        );
	        echo json_encode(array(
	            'succeeded' => $succeeded,
	            'failed' => $failed
	        ));
	    }
	}

    //election
	if(isset($_GET['insert_election'])){
		$el_id = $Functions->PDO_IDGenerator('tbl_election','election_id');
		$data = $_POST['data'];
		$date = $Functions->PDO_DateAndTime();

		$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_election(election_id,election_title,election_date,status) VALUES('$el_id','{$data[0]}','{$data[1]}',1)");
		if($Query->execute())
			echo 1;
		else{
			$Data = $Query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['list_election'])){
        $positions = array("President","Vice President","Secretary","Treasurer","Auditor","PIO","Peace Officer","Grade 7 Representative","Grade 8 Representative","Grade 9 Representative","Grade 10 Representative","Grade 11 Representative","Grade 12 Representative");

        $arr_election = array();
        $arr_electionDetails = array();
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_election ORDER BY  status DESC, election_date");
        foreach ($Query as $i => $v) {
			$election_id = $v[0];
			foreach ($positions as $a => $b) {
				$QueryCandidate = $Functions->PDO_SQL("SELECT * FROM tbl_candidate WHERE election_id = '{$election_id}' AND candidate_position = '{$b}'");
				$result = array();
				foreach ($QueryCandidate as $key => $value) {
					// $QueryVotes = $Functions->PDO_SQL("SELECT count(*) FROM tbl_votes WHERE candidate_id = '{$value[0]}' AND election_id = '{$election_id}'");
					$QueryDetails = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE voter_student_id = '{$value[1]}'");
					$result[] = [$value[1],$value[2],$value[7],$QueryDetails[0][1]." ".$QueryDetails[0][3].", ".$QueryDetails[0][2]];
				}
				$arr_election[$b] = $result;
			}
			$arr_electionDetails[] = array([json_encode($v),json_encode($arr_election)]);
        }
		print_r(json_encode($arr_electionDetails));
	}

	if(isset($_GET['get_active_election'])){
        $arr_election = array();
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
        print_r(json_encode($Query));
	}

	if(isset($_GET['register_candidate'])){
		$id = $Functions->PDO_IDGenerator('tbl_candidate','candidate_id');
		$data = $_POST['data'];
		$status = 1;

        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_candidate WHERE candidate_student_id = '{$data[0]}' AND election_id = '{$data[5]}'");
        if(count($Query)==0){
			$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_candidate(candidate_id,candidate_student_id,candidate_position,candidate_purpose,candidate_achievement,candidate_politicalparty,election_id) VALUES('$id','{$data[0]}','{$data[1]}','{$data[4]}','{$data[3]}','{$data[2]}','{$data[5]}')");
			if($Query->execute())
				echo 1;
			else{
				$Data = $Query->errorInfo();
				print_r($Data);
			}
        }
       	else{
       		echo "x";
       	}
	}

	if(isset($_GET['register_voter'])){
		$voter_id = $Functions->PDO_IDGenerator('tbl_voter','voter_id');
		$data = $_POST['data'];
		$education = 2;
		$status = 1;
		$date = $Functions->PDO_DateAndTime();
		$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_voter(voter_id,voter_image,voter_fname,voter_mname,voter_gname,voter_dob,voter_gender,voter_education,voter_student_id,voter_section,voter_yearlevel,voter_status,date) VALUES('$voter_id','{$data[0][1]}','{$data[0][2]}','{$data[0][4]}','{$data[0][3]}','{$data[0][5]}','{$data[0][6]}','{$education}','{$data[0][7]}','{$data[0][9]}','{$data[0][8]}','{$status}','{$date}')");
		if($Query->execute())
			echo 1;
		else{
			$Data = $Query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['update_voter'])){
		$data = $_POST['data'];
		$Query = $Functions->PDO_SQLQuery("UPDATE tbl_voter SET voter_yearlevel = '{$data[0]}', voter_section = '{$data[1]}' WHERE voter_id = '{$data[2]}'");
		if($Query->execute())
			echo 1;
		else{
			$Data = $Query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['list_voters'])){
        $return = '{"voters":[';
        $Query = $Functions->PDO_SQL("SELECT * FROM tbl_voter ORDER BY date DESC");
        foreach ($Query as $key => $value) {
        	$options = '{"name":"Options","id":"'.$Query[$key][0].'"}';
            if(count($Query) == ($key+1))
                $return .= '{"voter_fname":"'.$Query[$key][1].'","voter_mname":"'.$Query[$key][2].'","voter_gname":"'.$Query[$key][3].'","voter_age":"'.$Query[$key][4].'","voter_gender":"'.$Query[$key][5].'","voter_education":"'.$Query[$key][6].'","voter_student_id":"'.$Query[$key][7].'","voter_section":"'.$Query[$key][8].'","voter_yearlevel":"'.$Query[$key][9].'","voter_status":"'.$Query[$key][10].'","voter_image":"'.$Query[$key][11].'","voter_valid":"'.$Query[$key][12].'","options":'.$options.'}';
            else
                $return .= '{"voter_fname":"'.$Query[$key][1].'","voter_mname":"'.$Query[$key][2].'","voter_gname":"'.$Query[$key][3].'","voter_age":"'.$Query[$key][4].'","voter_gender":"'.$Query[$key][5].'","voter_education":"'.$Query[$key][6].'","voter_student_id":"'.$Query[$key][7].'","voter_section":"'.$Query[$key][8].'","voter_yearlevel":"'.$Query[$key][9].'","voter_status":"'.$Query[$key][10].'","voter_image":"'.$Query[$key][11].'","voter_valid":"'.$Query[$key][12].'","options":'.$options.'},';
        }
        $return .= "]}";
        echo $return;
	}

	if(isset($_GET['list_votes'])){
		$Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
		$election_id = $Query[0][0];
        $Query = $Functions->PDO_SQL("SELECT distinct(candidate_id),election_id FROM tbl_votes where election_id = '{$election_id}'");
        print_r(count($Query));
	}

	if(isset($_GET['get-candidates'])){
		$data = $_POST['data'];
		$pos = array();
		$candidates = array();
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_candidate WHERE election_id = '{$data}'");
        foreach ($Query as $key1 => $value1) {
        	if(!in_array($value1[2], $pos)){
        		$pos[] = $value1[2];
        	}
        }
        foreach ($pos as $key2 => $value2) {
        	$candidate_position = array();
	        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_candidate WHERE election_id = '{$data}' AND candidate_position = '{$value2}'");
	        foreach ($Query as $key3 => $value3) {
	        	$candidate_data = array();
		        $QueryCandidate = $Functions->PDO_SQL("SELECT * FROM  tbl_voter WHERE voter_student_id = '{$value3[1]}'");
 		       	$candidate_data[] = $QueryCandidate[0];
 		       	$candidate_data[] = $value3;
 		       	$candidate_position[] = $candidate_data;
	        }
        	$candidates[$value2] = $candidate_position;

        }
        //print_r($candidates);
        print_r(json_encode($candidates));
	}

	if(isset($_GET['get_events'])){
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_events");
        echo "[{$Query[0][1]},\"{$Query[0][2]}\"]";
        //print_r(json_encode([$Query[0][1],$Query[0][2]]));
	}

	if(isset($_GET['get_events2'])){
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_events");
        echo $Query[0][1];
	}

	if(isset($_GET['event_settings'])){
		$voter_id = $Functions->PDO_IDGenerator('tbl_voter','voter_id');
		$data = '{"organize-election":[{"title":"1. New Election","start":"02-02-2016","end":"02-02-2016","className":"bg-purple","media":"","description":"Start new poll. This will initiate the election"}],"candidate_nomination":[{"title":"2. Candidates Nomination","start":"02-02-2016","end":"02-02-2016","className":"bg-blue","media":"","description":"Nominate eligible candidates"}],"voter_validation":[{"title":"3. Validate Voters","start":"02-02-2016","end":"02-02-2016","className":"bg-green","media":"","description":"Validate active voters"}],"grant_access":[{"title":"4. Grant Access","start":"02-02-2016","end":"02-02-2016","className":"bg-orange","media":"","description":"Validated voters will gain access to vote"}],"election_day":[{"title":"5. Election Day","start":"02-02-2016","end":"02-02-2016","className":"bg-red","media":"","description":"Validated voters can vote candidates"}]}';
		$education = 2;
		$status = 1;
		$date = $Functions->PDO_DateAndTime();
		$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_events(id,events) VALUES('$voter_id','{$data}')");
		if($Query->execute())
			echo 1;
		else{
			$Data = $Query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['update_events'])){
		$data = $_POST['data'];
		$date_data1 = explode(" ", $data[1]);
		$date_data1 = "{$date_data1[1]}-{$date_data1[2]}-{$date_data1[3]} {$date_data1[4]}";
		$date_data1 = date("m-d-Y H:i:s",strtotime($date_data1));
		if((count($data) > 2) && ($data[2] !== "")){
			$date_data2 = explode(" ", $data[2]);
			$date_data2 = "{$date_data2[1]}-{$date_data2[2]}-{$date_data2[3]} {$date_data2[4]}";
			$date_data2 = date("m-d-Y H:i:s",strtotime($date_data2));
		}
		else{
    		$date_data2 = $date_data1;
		}
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_events");
        $Query = json_decode($Query[0][1]);
        foreach ($Query as $key => $value) {
        	//print_r($value[0]->title);
        	if($value[0]->title === $data[0]){
        		$value[0]->start = $date_data1;
        		$value[0]->end = $date_data2;
        	}
        }

        $newEvent = json_encode($Query);
        $Query = $Functions->PDO_SQLQuery("UPDATE tbl_events SET events='{$newEvent}'");
        if($Query->execute()){
	        if($data[0] == "5. Election Day"){
				$date = explode(" ", $data[1]);
				$date = "{$date[1]}-{$date[2]}-{$date[3]} {$date[4]}";
				$date = date("m-d-Y H:i:s",strtotime($date));
		        $QueryDel = $Functions->PDO_SQLQuery("UPDATE tbl_election SET election_date = '{$date}' WHERE status = 1");
		        $QueryDel->execute();
	        }
	        /*
	        $QueryDel = $Functions->PDO_SQLQuery("DELETE FROM tbl_access");
	        $QueryDel->execute();
	        $QueryDel = $Functions->PDO_SQLQuery("UPDATE tbl_voter SET voter_status = '0'");
	        $QueryDel->execute();
	        */
        	echo 1;
        }
        else{ 
            $Data = $Query->errorInfo();
            echo 'There was an error with your request. SQL says: "'.$Data[2].'"';
        }
	}

	if(isset($_GET['reset_events'])){
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_events");
        $Query = json_decode($Query[0][1]);
        foreach ($Query as $key => $value) {
    		$value[0]->start = '00-00-0000 00:00:00';
    		$value[0]->end = '00-00-0000 00:00:00';
        }
        $newEvent = json_encode($Query);
        $Query = $Functions->PDO_SQLQuery("UPDATE tbl_events SET events='{$newEvent}', status = 0");
        if($Query->execute()){
	        $QueryDel = $Functions->PDO_SQLQuery("DELETE FROM tbl_access");
	        $QueryDel->execute();
	        $QueryDel = $Functions->PDO_SQLQuery("UPDATE tbl_voter SET voter_status = '0'");
	        $QueryDel->execute();
        	echo 1;
        }
        else{ 
            $Data = $Query->errorInfo();
            echo 'There was an error with your request. SQL says: "'.$Data[2].'"';
        }
	}

	if(isset($_GET['validate_voters'])){
		$data = $_POST['data'];
		$date = $Functions->PDO_DateAndTime();
		$Query = $Functions->PDO_SQLQuery("UPDATE tbl_voter SET date='{$date}', voter_status = 1 WHERE voter_id = '{$data}'");
		if($Query->execute())
			print_r(json_encode([1,$date]));
		else{
			$Data = $Query->errorInfo();
			print_r(json_encode([0,$Data]));
		}
	}

	if(isset($_GET['check_votersAccess'])){
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_access");
		print_r(json_encode($Query));
	}

	if(isset($_GET['grant_votersAccess'])){
		$flag = 0;
		$date = $Functions->PDO_DateAndTime();
		$Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
		$election_id = $Query[0][0];
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_voter WHERE voter_status = 1 AND date != ''");
        foreach ($Query as $key => $value) {
        	$id = sha1($key);
        	$student_id = $value[7];
        	$passCode = substr($id,0,8);

			$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_access(access_id,student_id,access_passcode,election_id) VALUES('{$id}','{$student_id}','{$passCode}','{$election_id}')");
			if($Query->execute())
				$flag = 0;
			else{
				$Data = $Query->errorInfo();
				$flag = $Data;
			}
        }
        print_r($flag);
	}

	if(isset($_GET['grant_allVotersAccess'])){
		$flag = 0;
		$date = $Functions->PDO_DateAndTime();
		$Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
		$election_id = $Query[0][0];
        $Query = $Functions->PDO_SQL("SELECT * FROM  tbl_voter");
        foreach ($Query as $key => $value) {
        	$id = $Functions->PDO_IDGenerator('tbl_access','access_id');
        	$student_id = $value[7];
        	$passCode = substr($id,0,8);

			$Query = $Functions->PDO_SQLQuery("INSERT INTO tbl_access(access_id,student_id,access_passcode,election_id) VALUES('{$id}','{$student_id}','{$passCode}','{$election_id}'); UPDATE tbl_voter SET date='{$date}', voter_status = 1, vote_status = 0 WHERE voter_student_id = '{$student_id}'");
			if($Query->execute())
				$flag = 0;
			else{
				$Data = $Query->errorInfo();
				$flag = $Data;
			}
        }
        print_r($flag);
	}

	if(isset($_GET['save-vote'])){
		$data = $_POST['data'];
		$flag = 0; $query = "";
		$Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
		$election_id = $Query[0][0];
		$username = $_SESSION['username'];
		$query1 = $Functions->PDO_SQL("SELECT * FROM tbl_voter");
		$query2 = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE vote_status = '1'");
		$count2 = count($query2)+1;
		$a = json_encode([count($query1),$count2]);

		foreach ($data[0] as $key => $value) {
			$candidateId = explode("|",$value["value"]);
			$candidate_voteCount = $Functions->PDO_SQL("SELECT votes FROM tbl_candidate WHERE candidate_id = '{$candidateId[0]}'");
			$candidate_voteCount = $candidate_voteCount[0][0]+1;
			$query .= "UPDATE tbl_candidate SET votes = {$candidate_voteCount} WHERE election_id = '{$election_id}' AND candidate_id = '{$candidateId[0]}'; ";
		}

		$Query = $Functions->PDO_SQLQuery($query);
		if($Query->execute()){
			$Query = $Functions->PDO_SQLQuery("DELETE FROM tbl_access WHERE student_id = '{$username}'; UPDATE tbl_voter SET voter_status = 0, vote_status = 1 WHERE voter_student_id = '{$username}'; UPDATE tbl_election SET election_details = '{$a}' WHERE status = 1");
			if($Query->execute()){
				echo 0;
			}
			else{
				$Data = $Query->errorInfo();
				print_r(json_encode([0,$Data]));
			}
		}
		else{
			echo "Error";
			print_r($Query->errorInfo());
		}
		// break;
	}

	if(isset($_GET['count-vote'])){
		$Query = $Functions->PDO_SQL("SELECT * FROM tbl_election WHERE status = '1'");
		if(count($Query)>0){
			$election_id = $Query[0][0];
			$Query = $Functions->PDO_SQL("SELECT * FROM tbl_candidate WHERE election_id = '{$election_id}'");
			$result = array();
			foreach ($Query as $key => $value) {
				$QueryDetails = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE voter_student_id = '{$value[1]}'");
				$result[] = [$value[1],$value[2],$value[7],$QueryDetails[0][1]." ".$QueryDetails[0][3].", ".$QueryDetails[0][2]];
			}
			print_r(json_encode($result));
		}
		else{
			echo 0;
		}
	}

	if(isset($_GET['reset-election'])){
		$query1 = $Functions->PDO_SQL("SELECT * FROM tbl_voter");
		$query2 = $Functions->PDO_SQL("SELECT * FROM tbl_voter WHERE vote_status = '1'");
		$a = json_encode([count($query1),count($query2)]);
        $Query = $Functions->PDO_SQLQuery("UPDATE tbl_election SET status = 0, election_details = '{$a}' WHERE status = 1 ");
        if($Query->execute()){
        	echo 1;
        }
        else{
            $Data = $Query->errorInfo();
            echo 'There was an error with your request. SQL says: "'.$Data[2].'"';
        }
	}
?>