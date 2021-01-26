$(document).ready (function(){
    let assignment = 0;
    let pens = 0;
    let paper = 0;
    let paperAdd= 0;
    let number = 1

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

    function buyPens(){
        var pensCost = Math.floor(10 * Math.pow(1.1,pens));
        if (assignment >= pensCost){
            pens += 1;
            assignment -= pensCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#pens").text(`${pens} assignment`)
        }
        var nextPenCost = Math.floor(10 * Math.pow(1.1,pens)); 
        $("#pensCost") .text(`${nextPenCost} assignments`)
    }

    function buyPaper(){
        var paperCost = Math.floor(100 * Math.pow(1.2,paper));
        if (assignment >= paperCost){
            paper += 1;
            assignment -= paperCost;
            $("#asgn").text(`${assignment} assignment finished`)
            $("#paper").text(`${paper} assignment`)
            paperAdd = paper * 10
        }
        var nextPaperCost = Math.floor(100 * Math.pow(1.2,paper)); 
        $("#paperCost").text(`${nextPaperCost} assignments`)
    }

    window.setInterval(function(){
        assignmentAdd(pens);
        assignmentAdd(paperAdd);
    }, 1000)
})