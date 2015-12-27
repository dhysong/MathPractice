var canvas = document.getElementById("canvas1");
if (canvas.getContext("2d")) { // Check HTML5 canvas support
  context = canvas.getContext("2d"); // get Canvas Context object

  var generateBundle = function(count) {

    context.lineWidth = 3;

    for(var i = 1; i <= count; i++) {
      if(i % 5 == 0) {
    		console.log('slash' + i + ' start: ' + (i - 4) * 20);
    		console.log('slash' + i + ' end: ' + (i - 1) * 20);
        // slash
        context.beginPath();
        context.strokeStyle = "navy";
        context.moveTo((i - 4) * 20, 80);
        context.lineTo((i - 1) * 20, 180);        
        context.stroke();
      }
      else {
        console.log('vert' + i + ' x-axis: ' + i * 20);
        // vert
        context.beginPath();
        context.moveTo(i * 20, 80);
        context.lineTo(i * 20, 180);
        context.strokeStyle = "navy";
        context.stroke();
      }
    }


  };

  generateBundle(45);
}