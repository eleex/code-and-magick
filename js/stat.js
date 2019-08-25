//Module 2
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderCloud = function(ctx, x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr){
    var maxElement = arr[0];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] > maxElement){
            maxElement = arr[i];
        }
    }
    
    return  parseInt(maxElement);
}


window.renderStatistics = function(ctx, names, times) {
    renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, 100, 10, '#fff');
    
    ctx.fillStyle = '#000';
    ctx.shadowColor = "#000";
    ctx.font = '16px PT Mono';
    ctx.textAlign = "start";
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);
    ctx.textAlign = "center";

    var maxTime = getMaxElement(times);

    var gistoNames = function(names, times){
        var textX = 0;
        for(var i = 0; i < names.length; i++){
            ctx.fillText(names[i], 160 + textX, 90);
            ctx.fillText(parseInt(times[i]), 160 + textX, 265);
            textX += 80;
        }

        textX = 0;
        for(var i = 0; i < times.length; i++){
            if(names[i] == 'Вы'){
                ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            }else{
                ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
            }
            ctx.fillRect(140 + textX, 250, 40, -150 / maxTime * times[i]);
            textX += 80;
        }
    }

    gistoNames(names, times);
};