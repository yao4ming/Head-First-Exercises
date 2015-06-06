var usernameValid = false;
var passwordValid = false;
var password2Valid = false;

onload = function(){

    checkFormStatus();

    var username = document.getElementById('username');
    username.addEventListener('blur', function(){

        //display in-progress img
        document.getElementById('status').className = 'thinking';

        //create request obj
        var xmlhttp = createRequest();
        if(xmlhttp){

            //configure request obj
            xmlhttp.open('GET', 'checkName.php?username='+encodeURI(username.value), true);
            xmlhttp.send();

            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

                    //display username status
                    if(xmlhttp.responseText == 'okay'){
                        document.getElementById('status').className = 'approved';
                        usernameValid = true;
                        checkFormStatus();
                    }
                    else{
                        document.getElementById('status').className = 'denied';
                        usernameValid = false;
                        checkFormStatus();
                    }
                }
            }
        }
        else
            alert('cannot create request obj');

    });

    var password1 = document.getElementById('password1');
    var password2 = document.getElementById('password2');
    password1.addEventListener('blur', function(){
        //password must contain 1 num and have 6 or more chars
        if((result = (this.value).match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!]).{6,20})/)) != null){
            console.log(result);
            passwordValid = true;
        }
        else
            console.log('password doesnt meet requirements');
    });
    password2.addEventListener('blur', function(){
        if(password1.value == this.value){
            password2Valid = true;
            checkFormStatus();
        }
        else
            alert('Passwords do not match');
    });
}

//monitor function
function checkFormStatus(){
    if(usernameValid && passwordValid && password2Valid)
        document.getElementById('register').disabled = false;
    else
        document.getElementById('register').disabled = true;
}

function createRequest(){
  try{
     var xmlhttp = new XMLHttpRequest();
  }catch(tryMS){
    try{
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }catch(otherMS){
      try{
          xmlhttp = new ActiveXObject('Maxml2.XMLHTTP');
      }catch(fail){
         return null;
      }

    }

  }

  return xmlhttp;
}
