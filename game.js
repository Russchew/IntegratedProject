let game = {
    //Items for achivement and stats tracking
    totalGameClicks: 0,
    totalAssignmentEarned: 0,


    //Items related to game itself
    assignment: 0,
    totalClicks: 0,
    totalAssignment: 0,
    clickAmount: 1,

    // Add assignment per click
    clickAdd: function(amount){
        this.assignment += amount;
        this.totalAssignment += amount;
        this.totalAssignmentEarned += 1;
        this.totalClicks += 1;
        this.totalGameClicks += 1;
        display.updateAssignment();
        display.updateModifers();
    },

    // Calculate the APS 
    assignmentPerSecond: function(){
        var APS = 0;
        for(i = 0; i < upgradesItem.name.length; i++){
            APS += upgradesItem.earning[i] * upgradesItem.owned[i];
        };
        if(transcend.totalAmountGained !== 0){
            APS += APS * (transcend.totalAmountGained/100);
        }
        return APS
    },
}


// "buildings" 
let upgradesItem = {
    name: ["Pens", "Paper", "Classmate", "Laptop", "Teacher", "Robot"],
    img: ["images/Pen.png", "images/Paper.png", "images/Classmate.png", "images/Laptop.png", "images/Teacher.png", "images/robot.png"],
    basePrice: [10, 100, 500, 1000, 10000, 1000000],
    price: [10, 100, 500, 1000, 10000, 1000000],
    owned: [0, 0 ,0, 0, 0, 0],
    earning: [0.4, 1.5, 5, 10, 100, 1000],
    scaling: [1.07, 1.07, 1.07, 1.07, 1.07, 1.07],
    buy: function(index){
        if(game.assignment >= this.price[index]){
            game.assignment -= this.price[index];
            this.owned[index]++;
            this.price[index] = Math.floor(this.basePrice[index] * Math.pow(this.scaling[index],this.owned[index]));
            display.updateAssignment();
            display.updateShop();
            display.updateModifers();
        }
    }
}

// Upgrades that cna be brought after a certain amount it reached
let upgradeModifiers = {
    name: [
        //Upgrades for Clicks
        "You Write Faster", "Two Hands Writing",
        
        //Upgrades for Pen
        "Increased Ink Capacity", "Better writing", 
        
        //Upgrade for paper
        "Bigger Paper", "Even Bigger Paper",
    ],
    description: [
        //Upgrades for Clicks
        "Clicking is twice as efficent", "Clicking is twice as efficent",

        //Upgrades for Pen
        "Pens are twice as effecient", "Pens are twice as efficient", 

        //Upgrade for paper
        "Paper is twice as efficent", "Paper is twice as efficent",
    ],
    type: ["click", "click", "building", "building",  "building", "building",],
    img: [
        //Upgrades for Clicks
        "Images/BookX2.png", "Images/BookX2.png",

        //Upgrades for Pen
        "Images/PenX2.png", "Images/PenX2.png",

        //Upgrade for paper
        "Images/paperX2.png", "Images/paperX2.png",
    ],
    cost: [
        //Upgrades for Clicks
        50, 500,

        //Upgrades for Pen
        100, 500, 

        //Upgrade for paper
        1000, 2500,
    ],
    index: [
        //upgrades for Clicks
        0, 0,

        //Upgrades for Pen
        0, 0,

        //Upgrade for paper
        1, 1,
    ],
    requiredAmount: [
        //upgrades for Clicks
        5, 150,

        //Upgrades for Pen
        10, 30,

        //Upgrade for paper
        10, 30,
    ],
    multiplier: [
        //upgrades for Clicks
        2, 2,

        //Upgrades for Pen
        2, 2,

        //Upgrade for paper
        2, 2,
    ],
    purchased: [false, false, false, false, false, false],
    buy: function(index){
        if(!this.purchased[index] && game.assignment >= this.cost[index]){
            if(this.type[index] == "building" && upgradesItem.owned[this.index[index]] >= this.requiredAmount[index]){
                game.assignment -= this.cost[index];
                upgradesItem.earning[this.index[index]] *= this.multiplier[index];
                this.purchased[index] = true;
                display.updateShop();
                display.updateAssignment();
                display.updateModifers();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requiredAmount[index]) {
                game.assignment -= this.cost[index];
                game.clickAmount *= this.multiplier[index];
                this.purchased[index] = true;
                display.updateShop();
                display.updateAssignment();
                display.updateModifers();
            }
        }
    }
}


// Display the assignment
let display = {
    updateAssignment: function(){
        // Ensures the 0 doesnt appear
        if (Number.isInteger(game.assignment)){
            document.getElementById("asgn").innerHTML = game.assignment + " Assignment Finished";
        } else {
            assignemnt = game.assignment
            assignemnt = assignemnt.toFixed(2);
            document.getElementById("asgn").innerHTML = assignemnt + " Assignment Finished";
        }

        // Ensures the 0 doesnt appear
        APSDisplay = game.assignmentPerSecond();
        if (Number.isInteger(APSDisplay)){
            document.getElementById("aps").innerHTML = APSDisplay + " assignment per second";
        } else {
            APS = APSDisplay
            APS = APS.toFixed(2);
            document.getElementById("aps").innerHTML = APS + " assignment per second";
        }
        document.title = game.assignment + " Assignemnt";
    },

    // Create the shop on load base on what there is
    updateShop: function(){
        document.getElementById("upgradesContainer").innerHTML = ``;
        for(i = 0; i < upgradesItem.name.length; i++){
            document.getElementById("upgradesContainer").innerHTML += `
            <table class="upgradeItems" onclick="upgradesItem.buy(${i})">
                <tr>
                    <td class="upgradeImage"><img src=${upgradesItem.img[i]} alt="${upgradesItem.name[i]}"></td>
                    <td>
                        <p>${upgradesItem.name[i]}</p>
                        <p>Cost: ${upgradesItem.price[i]}</p>
                    </td>
                    <td class="numberDisplay">${upgradesItem.owned[i]}</td>
                </tr>
            </table>`
        }
    },

    // Create the upgrsades on load base on what there is
    updateModifers: function(){
        document.getElementById("modifiersContainer").innerHTML = "";
        for (i = 0; i < upgradeModifiers.name.length; i++){
            if (!upgradeModifiers.purchased[i]){
                if (upgradeModifiers.type[i] == "building" && upgradesItem.owned[upgradeModifiers.index[i]] >= upgradeModifiers.requiredAmount[i]) {
                    document.getElementById("modifiersContainer").innerHTML += `<img src="${upgradeModifiers.img[i]}" alt="MOD" class="modifiers" title="${upgradeModifiers.name[i]} &#10; ${upgradeModifiers.description [i]} &#10; (${upgradeModifiers.cost[i]} Assignemnts)" onclick="upgradeModifiers.buy(${i});"></img>`; 
                } else if (upgradeModifiers.type[i] == "click" && game.totalClicks >= upgradeModifiers.requiredAmount[i]) {
                    document.getElementById("modifiersContainer").innerHTML += `<img class="modifiers" src="${upgradeModifiers.img[i]}" alt="MOD" title="${upgradeModifiers.name[i]} &#10; ${upgradeModifiers.description [i]} &#10; (${upgradeModifiers.cost[i]} Assignemnts)" onclick="upgradeModifiers.buy(${i});"></img>`; 
                }
            }
        }
    }
}


let transcend = {
    requiredAmount: 1000000,
    amount: 0,
    totalAmountGained: 0,
    numberOfTimes: 0,
    currentRequiredAmount: 0,

    levelup: function(){
        if (game.assignment >= this.requiredAmount){
            this.amount += 1;
            this.requiredAmount = this.requiredAmount + (this.requiredAmount * 0.1);
        }
    },

    // Reset the game with transende and stat still saved
    reset: function(){
        this.totalAmountGained = this.amount;
        this.numberOfTimes += 1;
        var gameSave= {
            totalAmountGained: this.totalAmountGained,
            totalGameClicks: game.totalGameClicks,
            totalAssignmentEarned: game.totalAssignmentEarned,
            transendNumberOfTime: transcend.numberOfTimes,
            transcendAmount: transcend.amount,
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

function saveGame(){
    var gamesave = {
        assignment: game.assignment,
        totalAssignment: game.totalAssignment,
        totalAssignmentEarned: game.totalAssignmentEarned,
        totalClicks: game.totalClicks,
        totalGameClicks: game.totalGameClicks,
        clickAmount: game.clickAmount,
        ownedItems: upgradesItem.owned,
        itemEarning: upgradesItem.earning,
        itemPrice: upgradesItem.price,
        modifiersPurchase: upgradeModifiers.purchased,
        transcendRequired: transcend.requiredAmount,
        transcendAmount: transcend.amount,
        transendNumberOfTime: transcend.numberOfTimes
    }
    localStorage.setItem("gameSave", JSON.stringify(gamesave))
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if(typeof savedGame.assignment !== "undefined") {game.assignment = savedGame.assignment;}
        if(typeof savedGame.totalAssignment !== "undefined") {game.totalAssignment = savedGame.totalAssignment;}
        if(typeof savedGame.totalAssignmentEarned !== "undefined") {game.totalAssignmentEarned = savedGame.totalAssignmentEarned;}
        if(typeof savedGame.totalClicks !== "undefined") {game.totalClicks = savedGame.totalClicks;}
        if(typeof savedGame.totalGameClicks !== "undefined") {game.totalGameClicks = savedGame.totalGameClicks;}
        if(typeof savedGame.clickAmount !== "undefined") {game.clickAmount = savedGame.clickAmount;}
        if(typeof savedGame.transcendRequired !== "undefined") {transcend.requiredAmount = savedGame.transcendRequired;}
        if(typeof savedGame.transcendAmount !== "undefined") {transcend.amount = savedGame.transcendAmount;}
        if(typeof savedGame.totalAmountGained !== "undefined") {transcend.totalAmountGained = savedGame.totalAmountGained;}
        if(typeof savedGame.transendNumberOfTime !== "undefined") {transcend.numberOfTimes = savedGame.transendNumberOfTime;}
        if(typeof savedGame.ownedItems !== "undefined") {
            for (i = 0; i < savedGame.ownedItems.length; i++){
                upgradesItem.owned[i] = savedGame.ownedItems[i];
            }
        };
        if(typeof savedGame.itemEarning !== "undefined") {
            for (i = 0; i < savedGame.itemEarning.length; i++){
                upgradesItem.earning[i] = savedGame.itemEarning[i];
            }
        };
        if(typeof savedGame.itemPrice !== "undefined") {
            for (i = 0; i < savedGame.itemEarning.length; i++){
                upgradesItem.price[i] = savedGame.itemPrice[i];
            }
        };
        if(typeof savedGame.modifiersPurchase !== "undefined") {
            for (i = 0; i < savedGame.modifiersPurchase.length; i++){
                upgradeModifiers.purchased[i] = savedGame.modifiersPurchase[i];
            }
        };
    }
}

function reset(){
    
    if(confirm("This will wipe out the game and start afresh. Are you sure.")){
        profile.RemoveData();
        console.log("DO IT")
    }
    
}

window.onload = function() {
    loadGame();
    display.updateAssignment();
    display.updateShop();
    display.updateModifers();
};

window.setInterval(function(){
    transcend.levelup();
    transcend.currentRequiredAmount = transcend.requiredAmount - game.assignment
});

window.setInterval(function(){
    game.assignment += game.assignmentPerSecond();
    game.totalAssignmentEarned += game.assignmentPerSecond();
    display.updateAssignment();
    display.updateModifers();
}, 1000);

window.setInterval(function(){
    saveGame();
    profile.updateProfileData();
}, 5000);

window.setInterval(function(){
    display.updateAssignment();
    display.updateModifers();
}, 10000);

// used to add assignemnt. To use for test and debug
function debugAdd(x){
    game.assignment = game.assignment + x;
    return game.assignment
}

$(document).ready(function(){
    $("#transcend").click(function(){
        $(".popup").css("display", "block");
        if (transcend.amount == 0) {
            $("#transcendYes").css("display", "none")
        } else {
            $("#transcendYes").css("display", "inline")
            $("#transendWarning").css("display", "none")
        }
        document.getElementById("transcendAmount").innerHTML = `You will gain ${transcend.amount} transcend point`
        $("#transcendRequired").text(`You need to complete ${transcend.currentRequiredAmount} asignment`)
    });

    $("#transcendNo").click(function(){
        $(".popup").css("display", "none");
    });

    // --------------------------------------------------------------------------------
    $("#stats").click(function(){
        $(".popupStats").css("display", "block");
        $("#totalClicks").text(`Total Clicks: ${game.totalGameClicks} clicks`)
        var TPE = Math.floor(game.totalAssignmentEarned)
        $("#totalAssignment").text(`Total Assignemnts: ${TPE} assignments`)
        $("#totalTranscend").text(`Total Transend Points: ${transcend.amount} points`)
        $("#transcendNumberOfTImes").text(`You have transcended ${transcend.numberOfTimes} times`)
    });

    $("#statsClose").click(function(){
        $(".popupStats").css("display", "none");
    });

    $("#profile").click(function(){
        localStorage.setItem("login", "yes")
        profile.updateProfileData();
    })
});

// --------------------------------------------For profile-------------------------------------------------------------
let profile = {
    name: localStorage.getItem("username"),
    date: new Date(),
    APS: game.assignmentPerSecond(),
    login: localStorage.getItem("login"),

    updateProfileData: function(){
        console.log("Running update profile")
        if (this.login == "yes") {
            console.log("Checking!")
            if(this.name == "false"){
                if(confirm("Do you want to log in and save the data")){
                    window.location.href = "login.html";
                } else {
                    console.log("STOP ASKING")
                    localStorage.setItem("login", "no")
                }
            } else {
                var APS = game.assignmentPerSecond()
                firebase.database().ref("game/" + this.name ).set({
                    TotalClicks: game.totalGameClicks,
                    NumberOfTranscend: transcend.numberOfTimes,
                    TotalAssignmentEarned: game.totalAssignmentEarned,
                    CurrentAPS: APS,
                    ClosingTime: this.date.getHours(),
                    OpenTime: this.date .getHours(),
                }, (error) => {
                    if (error) {
                        console.log("unsucessful")
                    } else {
                        console.log("sucessful")
                    }
                });
            }
        } else {
            console.log("please stop")
        }
        
    },

    RemoveData: function() {
        firebase.database().ref("game/" + this.name).update({
            TotalClicks: 0,
            transcendAmount: 0,
            totalAssignmentEarned: 0,
        }, (error) => {
            if (error) {
                console.log("unsucessful")
            } else {
                console.log("sucessful")
                var gameSave= {};
                localStorage.setItem("gameSave", JSON.stringify(gameSave));
                location.reload();
            }
        });
    }
}

// Calculate the offline amount
window.addEventListener("DOMContentLoaded", function() {
    var loadDate = new Date();
    if(profile.name == "false"){
        if(confirm("Do you want to log in and retrive the data")){
            window.location.href = "login.html";
        } else {
            localStorage.setItem("login", "no")
        }
    } else {
        console.log("Offline Check")
        firebase.database().ref("game/" + profile.name).update({
            OpenTime: loadDate.getHours(),
        }, (error) => {
            if (error) {
                console.log("unsucessful")
                localStorage.setItem("username", "false")
            } else {
                console.log("sucessful")
            }
        });
        firebase.database().ref('game/' +  profile.name).on("value", (snapshot) => {
            console.log("Adding?")
            if(snapshot.val() !== null){
                closingTime = snapshot.val().ClosingTime;
                openTime = snapshot.val().OpenTime;
                CurrentAPS = snapshot.val().CurrentAPS;
                console.log(snapshot.val().ClosingTime)
                console.log(snapshot.val().OpenTime)

                timeInterval = Math.abs(closingTime - openTime)
                console.log(timeInterval)
                numbertoadd = ((timeInterval * CurrentAPS) * 60)
                console.log(numbertoadd)
                game.assignment = game.assignment + numbertoadd
            }
        })
    }
})

// Logs you out
window.onbeforeunload = () => {
    localStorage.setItem("username", "false")
}