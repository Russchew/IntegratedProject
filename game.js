let assignment = 0;
let pens = 0;
let paper = 0;
let paperAdd= 0;
let classmate = 0;
let classmateAdd = 0;
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
        $("#asgn").text(`${assignment} assignment finished`)
    }


    //Each pens adds to total nuber of assignment per click
    function buyPens(){
        var pensCost = Math.floor(10 * Math.pow(1.1,pens));
        if (assignment >= pensCost){
            pens += 1;
            assignment -= pensCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#pens").text(`${pens} pens`)
            pensAdd = pens * 1;
            totalAPS += pensAdd;
        }
        var nextPenCost = Math.floor(10 * Math.pow(1.1,pens)); 
        $("#pensCost") .text(`${nextPenCost} assignments`)
    }


    //Each paper adds 5 assigment per interval
    function buyPaper(){
        var paperCost = Math.floor(100 * Math.pow(1.3, paper));
        if (assignment >= paperCost){
            paper += 1;
            assignment -= paperCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#paper").text(`${paper} paper`)
            paperAdd = paper * 5;
            totalAPS += paperAdd;
        }
        var nextPaperCost = Math.floor(100 * Math.pow(1.3, paper)); 
        $("#paperCost").text(`${nextPaperCost} assignments`)
    }


    function buyClassmate(){
        var classmateCost = Math.floor(2500 * Math.pow(1.5, classmate));
        if (assignment >= classmateCost){
            classmate += 1;
            assignment -= classmateCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#classmate").text(`${classmate} classmate`)
            classmateAdd = classmate * 15;
            totalAPS += classmateAdd;
        }
        var nextClassmateCost = Math.floor(2500 * Math.pow(1.5, classmate)); 
        $("#classmateCost").text(`${nextClassmateCost} assignments`)
    }

    window.setInterval(function(){
        $("#asgn").text(`${assignment} assignment finished`)
        $("#ips").text(`${totalAPS} assignment per second`)
    })

    window.setInterval(function(){
        assignmentAdd(pensAdd);
        assignmentAdd(paperAdd);
        assignmentAdd(classmateAdd);
    }, 1000)
})

