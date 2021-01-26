$(document).ready (function(){
    let assignment = 0;
    let pens = 0
    let number = 1

    $("#click").click(function(){
        assignmentAdd(number);
    })

    $("#pensCost").click(function(){
       buyPens();
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

    window.setInterval(function(){
        assignmentAdd(pens);
    }, 1000)
})