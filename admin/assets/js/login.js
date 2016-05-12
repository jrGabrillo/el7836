$(document).ready(function(){
	//initialization

	$("#field_show_password").mousedown(function() {
		$("#field_password").prop({"type":"text"});
	}).mouseup(function() {
		$("#field_password").prop({"type":"password"});
	})

	$("#button_login").click(function(){
		var Data = Array({1:$("#field_username").val(),2:$("#field_password").val()});
		$("#message_login").html("Loading...");
	 	$.ajax({
			url: "admin/assets/harmony/Process.php?Login",
			type: "POST",
			data: {Data:Data},
			success: function(returnValue){
				console.log(returnValue);
				if(returnValue == 1){ //success
					$("#field_username").val("");
					$("#field_password").val("");
					$("#message_login").html("");
			        window.location = "admin/";
				}
				else if(returnValue == 2){ //success
					$("#field_username").val("");
					$("#field_password").val("");
					$("#message_login").html("");
			        window.location = "admin/voting_system.html";
				}
				else{ //fail 
					$("#message_login").html("Log in failed. Incorrect username and password.");
				}
			}
		});
	});	
})

