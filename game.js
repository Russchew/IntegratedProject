let assignment = 0;

//Variable for upgrades
let pens = 0;
let pensAdd = 0;
let paper = 0;
let paperAdd= 0;
let classmate = 0;
let classmateAdd = 0;

//Variables for modifiers
let clickMod = 1;
let penMod = 1;
let paperMod = 1;
let classmatMod = 1;

//Variables for click and total ASP
let clickNumber = 1;
let number = 0;
let totalAPS = 0;

upgradesItem = {
    upgrades: ["pens", "paper", "classmate"],
    price: [10, 100, 500],
}

function debugAdd(x){
    assignment = assignment + x;
    return assignment
}

$(document).ready (function(){

    //Add assignemnt done when clicking
    $("#click").click(function(){
        assignmentAdd(clickNumber, clickMod);
    })



    //Event listener for buying modifiers--------------------------------------------

    //Modfier upgrade 1 - Adds extra 5 per click
    $("#mod1").click(function(){
        var mod1Cost = 100;
        if (assignment >= mod1Cost){
            clickNumber += 5;
            $("#mod1").css("display", "none");
        }
    })

    //Modfier upgrade 2 - Adds 2x APS to the pen
    $("#mod2").click(function(){
        var mod2Cost = 100;
        if (assignment >= mod2Cost){
            penMod = penMod * 2;
            $("#mod2").css("display", "none");
        }
    })



    //Event listener for buying upgrades----------------------------------------------
    $("#pens").click(function(){
       buyPens();
    })

    $("#paper").click(function(){
        buyPaper();
    })

    $("#classmate").click(function(){
        buyClassmate();
    })


    //Functions-----------------------------------------------------------------------

    //Function to add to assignemnts
    function assignmentAdd(number, modifiers){
        assignment = assignment + number * modifiers;
        let displayAssignment = assignment.toString().split(".");
        $("#asgn").text(`${displayAssignment[0]} assignment finished`)
    }

    function buyPens(){
        var pensCost = Math.floor(10 * Math.pow(1.1,pens));
        if (assignment >= pensCost){
            pens += 1;
            assignment -= pensCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#penDisplay").text(`${pens}`)
            pensAdd = pens * 0.2;
        }
        var pensCost = Math.floor(10 * Math.pow(1.1,pens)); 
        $("#pensCost") .text(`${pensCost} assignments`)
    }

    function buyPaper(){
        var paperCost = Math.floor(100 * Math.pow(1.2, paper));
        if (assignment >= paperCost){
            paper += 1;
            assignment -= paperCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#paperDisplay").text(`${paper}`)
            paperAdd = paper * 2;
        }
        var nextPaperCost = Math.floor(100 * Math.pow(1.2, paper)); 
        $("#paperCost").text(`${nextPaperCost} assignments`)
    }

    function buyClassmate(){
        var classmateCost = Math.floor(1000 * Math.pow(1.3, classmate));
        if (assignment >= classmateCost){
            classmate += 1;
            assignment -= classmateCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#classmateDisplay").text(`${classmate}`)
            classmateAdd = classmate * 5;
        }
        var nextClassmateCost = Math.floor(1000 * Math.pow(1.3, classmate)); 
        $("#classmateCost").text(`${nextClassmateCost} assignments`)
    }



    //Interval---------------------------------------------------------------------

    //This is to make sure it is always updating the current score
    window.setInterval(function(){
        let displayAssignment = assignment.toString().split(".");
        $("#asgn").text(`${displayAssignment[0]} assignment finished`)

        totalAPS = pensAdd * penMod + paperAdd * paperMod + classmateAdd * classmatMod;
        if (Number.isInteger(totalAPS)){
            $("#ips").text(`${totalAPS} assignment per second`)
        } else {
            displayTotalAPS = totalAPS.toFixed(2);
            $("#ips").text(`${displayTotalAPS} assignment per second`)
        }
    })

    //Used to update every second
    window.setInterval(function(){
        console.log(assignment)
        assignmentAdd(pensAdd, penMod);
        assignmentAdd(paperAdd, paperMod);
        assignmentAdd(classmateAdd, penMod);
    }, 1000)
})

