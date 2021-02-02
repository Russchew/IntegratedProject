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
        this.totalClicks += 1;
        display.updateAssignment();
    },

    assignmentPerSecond: function(){
        var APS = 0;
        for(i = 0; i < upgradesItem.name.length; i++){
            APS += upgradesItem.earning[i] * upgradesItem.owned[i];
        }
        return APS
    },
}

let upgradesItem = {
    name: ["Pens", "Paper", "Classmate", "Laptop", "Teacher", "Robot"],
    img: ["", "", "", "", ""],
    basePrice: [10, 100, 500, 1000, 10000, 1000000],
    price: [10, 100, 500, 1000, 10000, 1000000],
    owned: [0, 0 ,0, 0, 0, 0],
    earning: [0.2, 1, 5, 10, 100, 1000],
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
    name: ["Increased Ink Capacity", ],
    description: ["Pens are twice as effecient"],
    type: ["building"],
    img: [""],
    cost: [100],
    index: [0],
    requiredAmount: [10],
    multiplier: [2],
    purchased: [false],
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
                    document.getElementById("modifiersContainer").innerHTML += `<span class="modifiers" title="${upgradeModifiers.name[i]} &#10; ${upgradeModifiers.description [i]} &#10; (${upgradeModifiers.cost[i]} Assignemnts)" onclick="upgradeModifiers.buy(${i});">1</span>`; 
                    //
                } else if (upgradeModifiers.type[i] == "click" && game.totalClicks >= upgradeModifiers.requiredAmount[i]) {

                }
            }
        }
    }
}

function saveGame(){
    var gamesave = {
        assignemnt: game.assignment,
        totalAssignment: game.totalAssignment,
        totalAssignmentEarned: game.totalAssignmentEarned,
        totalClicks: game.totalClicks,
        clickAmount: game.clickAmount,
        ownedItems: upgradesItem.owned,
        itemEarning: upgradesItem.earning,
        itemPrice: upgradesItem.price,
        modifiersPurchase: upgradeModifiers.purchased,
    }
    localStorage.setItem("gameSave", JSON.stringify(gamesave))
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {

    }
}

window.onload = function() {
    display.updateAssignment();
    display.updateShop();
    display.updateModifers();
};

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

