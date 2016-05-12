function modal_alert(Message){
    $("#modal-alert").modal("show");
    $("#text-modal-alert").html(Message);
}

function modal_confirmations(Message){
    $("#modal-confirmation").modal("show");
    $("#text-modal-confirmation").html(Message);
}

function modal_universal(Header,Message){
    $("#modal-universal-label").html(Header);
    $("#modal-universal").modal("show");
    $("#modal-universal-body").html(Message);
}

function modal_universal_md(Header,Message){
    $("#modal-universal-md-label").html(Header);
    $("#modal-universal-md").modal("show");
    //$("#modal-universal-md-body").html(Message);
}

function content_handler(hash){
	if(hash === "#candidate"){
		$("#dashboard_content").addClass("hidden");
		$("#voters_content").addClass("hidden");
		$("#election_content").addClass("hidden");	
		$("#candidate_content").removeClass("hidden");
		$("#element_candidate").addClass("active");
	}
	else if(hash === "#voter"){
		$("#dashboard_content").addClass("hidden");
		$("#candidate_content").addClass("hidden");
		$("#election_content").addClass("hidden");
		$("#voters_content").removeClass("hidden");
		$("#element_voter").addClass("active");
	}
	else if(hash === "#election"){
		$("#dashboard_content").addClass("hidden");
		$("#voters_content").addClass("hidden");
		$("#candidate_content").addClass("hidden");
		$("#election_content").removeClass("hidden");
		$("#element_election").addClass("active");
	}
	else{
		$("#dashboard_content").removeClass("hidden");
		$("#voters_content").addClass("hidden");
		$("#candidate_content").addClass("hidden");
		$("#election_content").addClass("hidden");
		$("#dashboard_content").removeClass("hidden");
		$("#element_dashboard").addClass("active");
	}
}

function Capitalize(Val){
    if(Val.val().length == 1)
        return Val.val(Val.val().toUpperCase());
}

function Message(Message){
    var RetMessage;
    RetMessage = '<div class="label label-success"><span class="glyphicon glyphicon-ok-circle"></span> '+ Message +'</div>';
    return RetMessage;
}

function ErrorMessage(Message){
    var RetMessage;
    RetMessage = '<div class="label label-danger"><span class="glyphicon glyphicon-exclamation-sign"></span> '+ Message +'</div>';
    return RetMessage;
}

function Valid(ID){
    ID.removeClass("disabled");
}

function Invalid(ID){
    ID.addClass("disabled");
}

function Validate(Fields,ID){
    var RetSendData = 0;
    for(loop=0;loop<Fields.length;loop++){
        RetSendData += Fields[loop];
    }
    if(RetSendData == 0){
        Valid(ID);
    }
    else{
        Invalid(ID);
    }
    return RetSendData;
}

function StringCounter(input,id,allowed){
	var a = allowed-input.length;
	if(a >= 0 && a <= 1){
	    id.html(a+" character remaining");
	}
	else if(a == -1){
	    id.html(-1*a+" character exceeded");
	}
	else if(a <= -2){
	    id.html(-1*a+" characters exceeded");
	}
	else{
	    id.html(a+" characters remaining");

	}
}

function election_list(){
	$.ajax({
		url: "http://localhost/voting_system/harmony/Process.php?list_election",
		type: type,
		data:{data:data},
		success: function(returnValue){
            var obj = JSON.parse(returnValue);
			console.log(obj);
            $('#list_election').dataTable({
                data:obj.elections,
                columns: [
                    { data: 'election_title' },
                    { data: 'election_date' },
                    { data: 'election_discription' },
                    { data: 'options' },
                ]
            });
		}
	});	
}

$(document).ready(function(){
	var url = "http://localhost/voting_system/settings.json";
	var type = "POST";
	var data = "";
	var hash = document.location.hash;

    var url = window.location.href;
    url = url.split('/');
    var base_url = url[0]+"//"+url[2]+"/"+url[3];

	//initialization
 	$.ajax({
		url: base_url+"/admin/assets/harmony/Process.php?check_access",
		type: type,
		success: function(data){
			if(data != 0){
				var obj = JSON.parse(data);
				if(obj[0][4] == 1){
					var user_role = 'Administrator';
				}
	            $('span.username').html(obj[0][1]);
	            $('img.user-picture').prop({"src":"assets/img/"+obj[0][5]});
	            $('small.user-role').html(user_role);
			}
			else{
		        window.location = "../";
			}
        }
	});

	$('#logout').click(function(){
	 	$.ajax({
			url: base_url+"/admin/assets/harmony/Process.php?logout",
			type: type,
			success: function(data){
				if(data == 0){
					console.log("log out failed.");
				}
				else{
			        window.location = "../";
				}
	        }
		});
	});
})

