
$("#submitLogin").click(function(event){
    
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    
    if(username == "" || password == ""){
        alert("Please fill in all fields");
    }else{
        $.ajax({
            type: "POST",
            url: "/api/auth/login",
            data: {email: email, password: password},
            success: function(data){
                if(data == "success"){
                    window.location.href = "/dashboard";
                }else{
                    alert(data);
                }
            }
        });
    }
});