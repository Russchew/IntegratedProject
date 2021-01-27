let assignment = 0;

//Variable for upgrades
let pens = 0;
let pensAdd = 0;
let paper = 0;
let paperAdd= 0;
let classmate = 0;
let classmateAdd = 0;

//Variables for click and total ASP
let clickNumber = 1;
let number = 0;
let totalAPS = 0;

function debugAdd(x){
    assignment = assignment + x;
    return assignment
}

$(document).ready (function(){

    //Add assignemnt done when clicking
    $("#click").click(function(){
        assignmentAdd(clickNumber);
    })

    //Event listener for buying modifiers
    $("#mod1").click(function(){
        var mod1Cost = 100;
        if (assignment >= mod1Cost){
            clickNumber += 5;
            $("#mod1").css("display", "none");
        }
    })

    //Event listener for buying upgrades
    $("#pensCost").click(function(){
       buyPens();
    })

    $("#paperCost").click(function(){
        buyPaper();
    })

    $("#classmateCost").click(function(){
        buyClassmate();
    })


    //Functions-----------------------------------------------------------------------

    //Function to add to assignemnts
    function assignmentAdd(number){
        assignment += number;
        let displayAssignment = assignment.toString().split(".");
        $("#asgn").text(`${displayAssignment[0]} assignment finished`)
    }


    function buyPens(){
        var pensCost = Math.floor(10 * Math.pow(1.1,pens));
        if (assignment >= pensCost){
            pens += 1;
            assignment -= pensCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#pens").text(`${pens} pens`)
            pensAdd = pens * 0.2;
        }
        var nextPenCost = Math.floor(10 * Math.pow(1.1,pens)); 
        $("#pensCost") .text(`${nextPenCost} assignments`)
    }

    function buyPaper(){
        var paperCost = Math.floor(100 * Math.pow(1.3, paper));
        if (assignment >= paperCost){
            paper += 1;
            assignment -= paperCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#paper").text(`${paper} paper`)
            paperAdd = paper * 2;
        }
        var nextPaperCost = Math.floor(100 * Math.pow(1.3, paper)); 
        $("#paperCost").text(`${nextPaperCost} assignments`)
    }

    function buyClassmate(){
        var classmateCost = Math.floor(1000 * Math.pow(1.5, classmate));
        if (assignment >= classmateCost){
            classmate += 1;
            assignment -= classmateCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#classmate").text(`${classmate} classmate`)
            classmateAdd = classmate * 5;
        }
        var nextClassmateCost = Math.floor(1000 * Math.pow(1.5, classmate)); 
        $("#classmateCost").text(`${nextClassmateCost} assignments`)
    }

    window.setInterval(function(){
        let displayAssignment = assignment.toString().split(".");
        $("#asgn").text(`${displayAssignment[0 ]} assignment finished`)

        totalAPS = pensAdd + paperAdd + classmateAdd;
        if (Number.isInteger(totalAPS)){
            $("#ips").text(`${totalAPS} assignment per second`)
        } else {
            displayTotalAPS = totalAPS.toFixed(2);
            $("#ips").text(`${displayTotalAPS} assignment per second`)
        }
    })

    window.setInterval(function(){
        console.log(assignment)
        assignmentAdd(pensAdd);
        assignmentAdd(paperAdd);
        assignmentAdd(classmateAdd);
    }, 1000)
})

