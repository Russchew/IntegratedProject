var nameVal, passVal;

function GetValue(){
    nameVal = document.getElementById("username").value;
    passVal = document.getElementById("password").value;
}


document.getElementById("submitSignUp").onclick = function (){
    GetValue();
    console.log(nameVal)
    firebase.database().ref("profile/" + nameVal ).set({
        username: nameVal,
        password: passVal,
    }, (error) => {
        if (error) {
            console.log("unsucessful")
        } else {
            console.log("sucessful")
            window.location.href = "login.html";
        }
    });
    
}
