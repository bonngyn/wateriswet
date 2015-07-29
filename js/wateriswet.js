window.onload = function()
  {
    var canvas = document.getElementById('canvas');
    document.addEventListener('keydown', doKeyDown, true);
    var ctx= canvas.getContext('2d');
    var bloo_image;
    var red_image;
    var yellow_image;


    ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
    ctx.strokeStyle = 'black'; // The border will also be black


    var bloo_x = Math.floor((Math.random() * (canvas.width - 80)) + 50); // x coords of bloo
    var bloo_y = Math.floor((Math.random() * (canvas.height - 80)) + 50); //y coords of bloo



    var yellow_x = Math.floor((Math.random() * (canvas.width - 80)) + 50); //x coords of yellow
    var yellow_y = Math.floor((Math.random() * (canvas.height - 80)) + 50); //y coords of yellow


    var red_x = Math.floor((Math.random() * (canvas.width - 100)) + 50); //x coords of red
    var red_y = Math.floor((Math.random() * (canvas.height - 100)) + 50); // y coords of red

    var randnum = 0; //sets the var for if red moves towards or away.



    drawMain();
    blue_bloo();
    yellow_supplies();
    red_triangle();


    //steps goes down each time an arrow key is pressed
    var steps;
    steps = 100;
    $( "#scorenum" ).text(steps);

    var collected;
    collected = 0;
    $("#collectednum").text(collected);

    var currentKey;          //records the current key pressed
    var TimerWalk;          //timer handle
    var charWalk = 2;       //1=1st foot, 2=stand, 3=2nd foot, 4=stand
    var charSpeed = 400;

    $(document).ready(function() {
     //add character state class
     $('#bloo').addClass('front-stand');

     });

    $(document).keydown(function(e){
       steps = steps -1;
       $( "#scorenum" ).text(steps);

       $("#collectednum").text (collected);
      //  console.log(steps);

       if (steps <= 0){
         console.log('gameover');
         window.location.href = "/end";
          }
        blue_yellow_collision();
        blue_red_collision();


    });


    $(document).ready(function() {

     //add character state class
     $('#bloo').addClass('front-stand');

     });

    function blue_bloo() {
        bloo_image = new Image();
        bloo_image.src = 'https://wiki.guildwars2.com/images/8/8c/Blue_Dot.png';
        bloo_image.onload = function() {
            ctx.drawImage(bloo_image,  bloo_x ,bloo_y)
        }
    }

    function yellow_supplies() {
        yellow_image = new Image();
        yellow_image.src = 'http://www.bodenimages.com/productimages/sw/15GAUT_33375_YEL_s.jpg';
        yellow_image.onload = function() {
            ctx.drawImage(yellow_image, yellow_x, yellow_y)
        }
    }

    function red_triangle() {
        red_image = new Image();
        red_image.src = 'images/red_triangle.png';
        red_image.onload = function() {
            ctx.drawImage(red_image, red_x , red_y )
        }
    }


// checks if blue and red collide



    function blue_red_collision(){ //removed  and y
      console.log("blue coords:" +  bloo_x  + "," +  bloo_y );
      console.log("red coords: " + red_x + "," +red_y);
      if ( (( bloo_x - 16)< red_x) && (red_x < ( bloo_x  + 16) ) ) {
          if( (( bloo_y - 16 ) <red_y) && (red_y< ( bloo_y + 16)) ){
          window.location.href = "/end";
          $("#collectednumb").text(collected);

        }
      }
      if( ( (red_x - 16)< bloo_x  )&& (  bloo_x < (red_x + 16) )){
        if (((red_y -16) < bloo_y ) &&  ( bloo_y < (red_y + 16))){
          window.location.href = "/end";
          $("#collectednumb").text(collected);
        }
      }
    }


    //checks if blue and yellow collide

    function blue_yellow_collision(){
        if ( (( bloo_x - 16)< yellow_x) && (yellow_x < ( bloo_x   + 16) ) ) {
            if( (( bloo_y - 16) <yellow_y) && (yellow_y< ( bloo_y  + 16)) ){
                // console.log("collided");
                steps = steps + 20;
                collected = collected + 1;
                yellow_x = Math.floor((Math.random() * (canvas.width - 80)) + 50);
                yellow_y = Math.floor((Math.random() * (canvas.height - 80)) + 50);
            }
        }
        if ( ((yellow_x -16 )< bloo_x   )&& (bloo_x   < (yellow_x + 16)) ){
            if (((yellow_y -16) <  bloo_y ) &&  ( bloo_y   < (yellow_y + 16)) ){
                // console.log("collideded");
                steps = steps + 20;
                collected = collected + 1;
                yellow_x = Math.floor((Math.random() * (canvas.width - 80)) + 50);
                yellow_y = Math.floor((Math.random() * (canvas.height - 80)) + 50);
            }

        }

    }


 //Hard coding the red_triangle


    //Function for Bloo to move
     function doKeyDown(e) {
        if(( bloo_y )<(canvas.height-40)){
            if(e.keyCode == 40) /*down*/{
                bloo_y =  bloo_y + 10;
                randnum = Math.floor((Math.random() * 3) + 1);
                    if (( red_y <(canvas.height-40)) && ( red_y>20)) {
                        if (randnum == 1) { //if bloo is higher then red
                            red_y = red_y - 10;
                        }
                        else{
                            red_y = red_y + 10;
                    }
                }
            }
        }
        if(( bloo_x )>(0)){
            if(e.keyCode == 37) /*left*/{
            bloo_x =  bloo_x- 10;
            randnum = Math.floor((Math.random() * 3) + 1);
                if ((( red_x )>(0)) && (( red_x )<(canvas.width-40))){
                    if (randnum == 1){ //if bloo is left of red
                        red_x = red_x - 10; // red move left with bloo
                    }
                    else{
                        red_x = red_x + 10; //move right towards
                    }
                }
            }
        }

        if(( bloo_x )<(canvas.width-40)){
            if(e.keyCode == 39) /*right*/{
                bloo_x =  bloo_x + 10;
                if ((( red_x )>(0)) && (( red_x )<(canvas.width-40))){
                  randnum = Math.floor((Math.random() * 3) + 1);
                  if (randnum == 1){ //if bloo is left of red
                    red_x = red_x - 10; //move right too
                   }
                  else{
                    red_x = red_x + 10; //move left
                   }
                }
           }
       }

        if(( bloo_y)>(20)){
            if(e.keyCode == 38) /*up*/{
                bloo_y =  bloo_y - 10;
                randnum = Math.floor((Math.random() * 3) + 1);
                if ((( red_y )<(canvas.height-40)) && (( red_y)>(20))){
                  if (randnum == 1){ //if bloo is higher then red
                    red_y = red_y - 10;
                  }
                  else{
                    red_y = red_y + 10;
                  }

               }
           }
       }

        // redy = Math.floor((Math.random() * 100) + 1);
        // redy = Math.floor((Math.random() * 100) + 1);
        clearCanvas();
        drawMain();
        yellow_supplies();
        red_triangle();
        blue_bloo();

      }


    //the canvas clears
    function clearCanvas() {
        canvas.width = canvas.width;
    }

    //draws the borders
    function drawMain()
        {
          ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
          ctx.strokeStyle = 'black'; // The border will also be black

          // The border is drawn on the outside of the rectangle, so we'll
          // need to move it a bit to the right and up. Also, we'll need
          // to leave a 20 pixels space on the top to draw the interface.
          ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

        }

}
