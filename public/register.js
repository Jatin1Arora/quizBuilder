var loginAjax = new XMLHttpRequest();
var storeAjax = new XMLHttpRequest();
var uIDCount = 0;
var registeredUserList = [];



function checkUser(object) {
    loginAjax.open("POST", "http://localhost:3000/getUser");
    loginAjax.setRequestHeader("Content-Type", "application/json");
    loginAjax.send(JSON.stringify(object));
}

function loginUser() {
    var Email = document.getElementById("loginEmail");
    var Password = document.getElementById("loginPassword");
    if (Email.value == "" || Password.value == "") {
        alert("Fill the empty fieldset.");
        (Email.value == "") ? Email.focus() : Password.focus();
    }
    else {
        checkEmailPresent(Email.value, Password.value);
    }
}
function checkEmailPresent(mail, pass) {
    checkUser({ mail, pass });
    loginAjax.onreadystatechange = function () {
        if (loginAjax.readyState == 4 && loginAjax.status == 200) {
            var statusRes = loginAjax.responseText;
            if (statusRes != "false") {
                window.location.replace('./component/add to cart/addToCart.html');
                sessionStorage.setItem("userSessionKey", statusRes);
            }
            else {
               
                console.log("Wrong Credentials");
            }
        }
    };
}

function checkUserName(name) {
    var exp = /[0-9]/g;
    var result = name.match(exp) || [];
    result = result.length;
    if (!result) return true;
    document.getElementById("registerUserName").focus();
    return false;
}


function storeUserArray(object) {
    storeAjax.open("POST", "http://localhost:3000/postUser");
    storeAjax.setRequestHeader("Content-Type", "application/json");
    storeAjax.send(JSON.stringify(object));
}

function addNewUser() {
   
    var Email = document.getElementById("registerEmail").value;
    var Name = document.getElementById("registerUserName").value;
    var Password = document.getElementById("Password1").value;
    var CPassword = document.getElementById("Password2").value;
    if (!checkUserName(Name) || Name == "") {
        alert("Your name has numbers or its empty.");
    }
    else if (CPassword.trim() != Password.trim() || Password == "") {
        alert("Your password does not match");
    }
    else {
        var userObject = {
            Email,
            Name,
            Password
        };
        storeUserArray(userObject);
        alert("Registered Successfully"); 
        alert("Registered Successfully"); 
        document.location.reload();
        return true; 
    }
}

