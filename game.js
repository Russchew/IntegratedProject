let game = {
    //Items for achivement and stats tracking
    totalClicks: 0,
    totalAssignmentEarned: 0,

    //Items related to game itself
    assignment: 0,
    totalAssignment: 0,
    clickAmount: 1,

    clickAdd: function(amount){
        this.assignment += amount;
        this.totalAssignment += amount;
        this.totalAssignmentEarned += 1;
        this.totalClicks += 1;
        display.updateAssignment();
        display.updateModifers();
    },

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

let upgradesItem = {
    name: ["Pens", "Paper", "Classmate", "Laptop", "Teacher", "Robot"],
    img: ["placeholder.png", "placeholder.png", "placeholder.png", "placeholder.png", "placeholder.png", "placeholder.png"],
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
        "Pens are twice as effecient", "Pens are twice as effecient", 

        //Upgrade for paper
        "Paper is twice as efficent", "Paper is twice as efficent",
    ],
    type: ["click", "click", "building", "building",  "building", "building",],
    img: [
        //Upgrades for Clicks
        "placeholder.png", "placeholder.png",

        //Upgrades for Pen
        "placeholder.png", "placeholder.png",

        //Upgrade for paper
        "placeholder.png", "placeholder.png",
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

let display = {
    updateAssignment: function(){
        if (Number.isInteger(game.assignment)){
            document.getElementById("asgn").innerHTML = game.assignment + " Assignment Finished";
        } else {
            assignemnt = game.assignment
            assignemnt = assignemnt.toFixed(2);
            document.getElementById("asgn").innerHTML = assignemnt + " Assignment Finished";
        }


        APSDisplay = game.assignmentPerSecond();
        if (Number.isInteger(APSDisplay)){
            document.getElementById("aps").innerHTML = APSDisplay + " assignment per second";
        } else {
            APS = APSDisplay
            APS = APS.toFixed(2);
            document.getElementById("aps").innerHTML = APS + " assignment per second";
        }
        // document.getElementById("asgn").innerHTML = game.assignment + " Assignment Finished";
        // document.getElementById("aps").innerHTML = game.assignmentPerSecond() + " assignment per second";
        document.title = game.assignment + " Assignemnt";
    },

    updateShop: function(){
        document.getElementById("upgradesContainer").innerHTML = ``;
        for(i = 0; i < upgradesItem.name.length; i++){
            document.getElementById("upgradesContainer").innerHTML += `
            <table class="upgradeItems" onclick="upgradesItem.buy(${i})">
                <tr>
                    <td class="upgradeImage"><img src=${upgradesItem.img[i]} alt="${upgradesItem.name[i]}"></td>
                    <td>
                        <p>${upgradesItem.name[i]}</p>
                        <p>${upgradesItem.price[i]}</p>
                    </td>
                    <td class="numberDisplay">${upgradesItem.owned[i]}</td>
                </tr>
            </table>`
        }
    },

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
    levelup: function(){
        if (game.assignment >= this.requiredAmount){
            this.amount += 1;
            this.requiredAmount = this.requiredAmount + (this.requiredAmount * 0.1);
        }
    },
    reset: function(){
        this.totalAmountGained = this.amount;
        var gameSave= {totalAmountGained: this.totalAmountGained,};
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
        clickAmount: game.clickAmount,
        ownedItems: upgradesItem.owned,
        itemEarning: upgradesItem.earning,
        itemPrice: upgradesItem.price,
        modifiersPurchase: upgradeModifiers.purchased,
        transcendRequired: transcend.requiredAmount,
        transcendAmount: transcend.amount
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
        if(typeof savedGame.clickAmount !== "undefined") {game.clickAmount = savedGame.clickAmount;}
        if(typeof savedGame.transcendRequired !== "undefined") {transcend.requiredAmount = savedGame.transcendRequired;}
        if(typeof savedGame.transcendAmount !== "undefined") {transcend.amount = savedGame.transcendAmount;}
        if(typeof savedGame.totalAmountGained !== "undefined") {transcend.totalAmountGained = savedGame.totalAmountGained;}
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
        var gameSave= {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

// document.getElementById("transcend").addEventListener("click", function(){
//     document.getElementsByClassName("popup").style.display = "block"
// }, false)

window.onload = function() {
    loadGame();
    display.updateAssignment();
    display.updateShop();
    display.updateModifers();
};

window.setInterval(function(){
    transcend.levelup();
});

window.setInterval(function(){
    game.assignment += game.assignmentPerSecond();
    game.totalAssignmentEarned += game.assignmentPerSecond();
    display.updateAssignment();
    display.updateModifers();
}, 1000);

window.setInterval(function(){
    saveGame();
}, 5000);

window.setInterval(function(){
    display.updateAssignment();
    display.updateModifers();
}, 10000);

function debugAdd(x){
    game.assignment = game.assignment + x;
    return game.assignment
}

$(document).ready(function(){
    $("#transcend").click(function(){
        $(".popup").css("display", "block");
        document.getElementById("transcendAmount").innerHTML = `You will gain ${transcend.amount} transcend point`
    });

    $("#transcendNo").click(function(){
        $(".popup").css("display", "none");
    });
});






// Old code used before up clean up and future proofing

// window.setInterval(function(){
//     let displayAssignment = assignment.toString().split(".");
//     $("#asgn").text(`${displayAssignment[0]} assignment finished`)

//     totalAPS = pensAdd * penMod + paperAdd * paperMod + classmateAdd * classmatMod;
//     if (Number.isInteger(totalAPS)){
//         $("#ips").text(`${totalAPS} assignment per second`)
//     } else {
//         displayTotalAPS = totalAPS.toFixed(2);
//         $("#ips").text(`${displayTotalAPS} assignment per second`)
//     }
// })

// let assignment = 0;

// //Variable for upgrades
// let pens = 0;
// let pensAdd = 0;
// let paper = 0;
// let paperAdd= 0;
// let classmate = 0;
// let classmateAdd = 0;

// //Variables for modifiers
// let clickMod = 1;
// let penMod = 1;
// let paperMod = 1;
// let classmatMod = 1;

// //Variables for click and total ASP
// let clickNumber = 1;
// let number = 0;
// let totalAPS = 0;


// $(document).ready (function(){

//     //Add assignemnt done when clicking
//     $("#click").click(function(){
//         assignmentAdd(clickNumber, clickMod);
//     })



//     //Event listener for buying modifiers--------------------------------------------

//     //Modfier upgrade 1 - Adds extra 5 per click
//     $("#mod1").click(function(){
//         var mod1Cost = 100;
//         if (assignment >= mod1Cost){
//             assignment -= mod1Cost;
//             clickNumber += 5;
//             $("#mod1").css("display", "none");
//         }
//     })

//     //Modfier upgrade 2 - Adds 2x APS to the pen
//     $("#mod2").click(function(){
//         var mod2Cost = 100;
//         if (assignment >= mod2Cost){
//             assignment -= mod1Cost;
//             penMod = penMod * 2;
//             $("#mod2").css("display", "none");
//         }
//     })



//     //Event listener for buying upgrades----------------------------------------------
//     $("#pens").click(function(){ buyPens(0); })

//     $("#paper").click(function(){ buyPaper(); })

//     $("#classmate").click(function(){ buyClassmate(); })


//     //Functions-----------------------------------------------------------------------

//     //Function to add to assignemnts
//     function assignmentAdd(number, modifiers){
//         assignment = assignment + number * modifiers;
//         let displayAssignment = assignment.toString().split(".");
//         $("#asgn").text(`${displayAssignment[0]} assignment finished`)
//     }

//     function buyPens(index){
//         upgradesItem.cost[index] = Math.floor(upgradesItem.price[index] * Math.pow(1.1,upgradesItem.upgrades[index]));
//         if (assignment >= upgradesItem.cost[index]){
//           upgradesItem.upgrades[index] += 1;
//           assignment -= upgradesItem.cost[index];
//           $("#asgn").text(`${assignment} assignment finished`)
//           $("#penDisplay").text(`${upgradesItem.upgrades[index]}`)
//           pensAdd = upgradesItem.upgrades[index] * 0.2;
//         }
//         upgradesItem.cost[index] = Math.floor(upgradesItem.price[index] * Math.pow(1.1,upgradesItem.upgrades[index]));
//         $("#pensCost") .text(`${upgradesItem.cost[index]} assignments`)
//     }

//     function buyPaper(){
//         var paperCost = Math.floor(100 * Math.pow(1.2, paper));
//         if (assignment >= paperCost){
//             paper += 1;
//             assignment -= paperCost;
//             $("#asgn").text(`${assignment} assignment finished`)
//             $("#paperDisplay").text(`${paper}`)
//             paperAdd = paper * 2;
//         }
//         var nextPaperCost = Math.floor(100 * Math.pow(1.2, paper)); 
//         $("#paperCost").text(`${nextPaperCost} assignments`)
//     }

//     function buyClassmate(){
//         var classmateCost = Math.floor(1000 * Math.pow(1.3, classmate));
//         if (assignment >= classmateCost){
//             classmate += 1;
//             assignment -= classmateCost;
//             $("#asgn").text(`${assignment} assignment finished`)
//             $("#classmateDisplay").text(`${classmate}`)
//             classmateAdd = classmate * 5;
//         }
//         var nextClassmateCost = Math.floor(1000 * Math.pow(1.3, classmate)); 
//         $("#classmateCost").text(`${nextClassmateCost} assignments`)
//     }



//     //Interval---------------------------------------------------------------------

//     //This is to make sure it is always updating the current score
//     window.setInterval(function(){
//         let displayAssignment = assignment.toString().split(".");
//         $("#asgn").text(`${displayAssignment[0]} assignment finished`)

//         totalAPS = pensAdd * penMod + paperAdd * paperMod + classmateAdd * classmatMod;
//         if (Number.isInteger(totalAPS)){
//             $("#ips").text(`${totalAPS} assignment per second`)
//         } else {
//             displayTotalAPS = totalAPS.toFixed(2);
//             $("#ips").text(`${displayTotalAPS} assignment per second`)
//         }
//     })

//     //Used to update every second
//     window.setInterval(function(){
//         console.log(assignment)
//         assignmentAdd(pensAdd, penMod);
//         assignmentAdd(paperAdd, paperMod);
//         assignmentAdd(classmateAdd, penMod);
//     }, 1000)
// })
