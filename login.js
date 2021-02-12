var nameVal, passVal;

function GetValue(){
    nameVal = document.getElementById("username").value;
    passVal = document.getElementById("password").value;
}

function Login(savedUsername, savedPassword){
    if(nameVal === savedUsername && passVal === savedPassword && savedUsername != null){
        localStorage.setItem("login", "yes")
        localStorage.setItem("username", savedUsername)
        window.location.href = "game.html";
    } else if (savedUsername == null) {
        document.getElementById("wrong").innerHTML = "This account doesnt exist, Please try again"
    } else if (nameVal === savedUsername && passVal !== savedPassword && savedUsername != null){
        document.getElementById("wrong").innerHTML = "You have entered the wrong information"
    }
}

document.getElementById("submitLogin").onclick = function (){
    GetValue();
    firebase.database().ref('profile/' + nameVal).on("value", (snapshot) => {
        console.log(snapshot.val())
        if(snapshot.val() !== null){
            savedUsername = snapshot.val().username;
            savedPassword = snapshot.val().password;
            Login(savedUsername, savedPassword);
        } else {
            document.getElementById("wrong").innerHTML = "You have entered the wrong information"
        }
    })

}