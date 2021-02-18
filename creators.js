var nameVal, messageVal;
var emailVal = ""

function GetValue(){
    nameVal = document.getElementById("name").value;
    emailVal = document.getElementById("email").value;
    messageVal = document.getElementById("message").value;
}


if (nameVal != null && emailVal != null && messageVal != null){
    console.log("HI")
}

document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault();
    GetValue();
    if (nameVal != "" && emailVal != "" && messageVal != ""){
        GetValue();
        fireEmail = emailVal.replace(/\./g, ",")
        firebase.database().ref(`feedback/${fireEmail}`).set({
            name: nameVal,
            email: emailVal,
            message: messageVal,
        }, (error) => {
            if (error) {
                console.log("unsucessful")
            } else {
                const player = document.getElementById("animation");
                player.style.display = "block"
                player.load("https://assets8.lottiefiles.com/packages/lf20_4eth4jy9.json")
                player.play();
                console.log("sucessful")
                document.getElementById("form").reset();
            }
        });
    } else {
        console.log("missing")
    }
    
}, false)
