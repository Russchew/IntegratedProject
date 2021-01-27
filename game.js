let assignment = 0;
let pens = 0;
let paper = 0;
let paperAdd= 0;
let number = 1;
let totalAPS = 0;

function debugAdd(x){
    assignment = assignment + x;
    return assignment
}

$(document).ready (function(){
    $("#click").click(function(){
        assignmentAdd(number);
    })

    $("#pensCost").click(function(){
       buyPens();
    })

    $("#paperCost").click(function(){
        buyPaper();
    })

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
            number += pens
            $("#asgn").text(`${assignment} assignment finished`)
            $("#pens").text(`${pens} assignment`)
        }
        var nextPenCost = Math.floor(10 * Math.pow(1.1,pens)); 
        $("#pensCost") .text(`${nextPenCost} assignments`)
    }


    //Each paper adds 5 assigment per interval
    function buyPaper(){
        var paperCost = Math.floor(100 * Math.pow(1.3,paper));
        if (assignment >= paperCost){
            paper += 1;
            assignment -= paperCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#paper").text(`${paper} assignment`)
            paperAdd = paper * 5;
            totalAPS += paperAdd;
        }
        var nextPaperCost = Math.floor(100 * Math.pow(1.3,paper)); 
        $("#paperCost").text(`${nextPaperCost} assignments`)
    }

    window.setInterval(function(){
        $("#asgn").text(`${assignment} assignment finished`)
        $("#ips").text(`${totalAPS} assignment per second`)
        assignmentAdd(paperAdd);
    }, 1000)
})

