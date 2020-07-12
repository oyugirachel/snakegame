//global constants
 var context; //game context
 


 //the width and height of the game 
 var width = 340;
 var height = 300;
 


 //the initial configuration
 var snakeLength = 3; //length of snake is 3
 var level = 1; // start from level 1
 var sqSize = 10; // step size is 10px.
 


 //the initial snake alignment and direction of movement
 //Snake is starts horizontal 
 var bodyX = new Array(150, 150-sqSize, 150-2*sqSize); //array of X coordinates for snake 

 var bodyY = new Array(200, 200, 200); //array of Y coordinates for snake 

 var vX = new Array(1, 1, 1); //array of horizontal velocity for snake 

 var vY = new Array(0, 0, 0); //array of manage vertical velocity for snake 
 
 //variables used on the canvas
 var rX;
 var rY;//keeping the scores
 var score = 0;
 var scoreDiv;
  // to hold the context of div used to display score and level
 
 var eaten = true; // to check if new rat needs to be placed

 var gameOver = false; // to check if the game is over and enable control to restart game
 
 

 var controlsDiv; // to hold the context of div used to display game controls
 
 
 // Initialize the game variables and the game context
 // and then sends the game to the main game loop
 


 function init()
 {
 // Get game context
 context = document.getElementById("canvas").getContext("2d");
 
 //draws the canvas
 drawCanvasBoundary();
 
 //draws snake
 drawSnake();

 
 //setTimeout calls the game loop i.e. gameProcess function after the specified time
 intervalId = setTimeout(gameProcess, 1000/6);
 
 
 //get handle to the div containing our score and level details
 scoreDiv = document.getElementById("score");
 
 
 //get handle to the div containing our score and level details
 controlDiv = document.getElementById("control");
 
 }
 
 
 
 
 // Clears the canvas to empty for redrawing
 
 
 function clear()
 {
 context.clearRect(0,0,width,height);
 }
 
 
 
 // Restart the game
 function restart()
 {
 bodyX = new Array(150, 150-sqSize, 150-2*sqSize);
 bodyY = new Array(200, 200, 200);
 
 vX = new Array(1, 1, 1);
 vY = new Array(0, 0, 0);
 
 snakeLength = 3;
 
 score = 0;
 level = 1;
 eaten = true;
 
 scoreDiv.innerHTML = "Score: " +score+"&nbsp;Level: "+level;
 
 intervalId = setTimeout(gameProcess, 1000/6);
 
 }
 
 
 function keydown(k)
 {
 if(k==1 && vX[0] != 1) //left 
 {
 vX[0] = -1;
 vY[0] = 0;
 }
 else if (k==2 && vY[0] != 1) //up 
 {
 vY[0] = -1;
 vX[0] = 0;
 }
 else if (k==3 && vX[0] != -1) //right 
 {
 vX[0] = 1;
 vY[0] = 0;
 }
 else if (k==4 && vY[0] != -1) //down 
 {
 vY[0] = 1;
 vX[0] = 0;
 }
 else if (k==5 && gameOver == true)//restart
 {
 gameOver = false;
 restart();
 }
 }
 
 
 
 //the canvas boundary
 function drawCanvasBoundary()
 {
 context.fillStyle="#FF00FF"; //set canvas color 
 context.fillRect(0,0,width,height); //draws a rectangle of canvas
 context.fill();
 context.strokeStyle="#000";
 context.strokeRect(0,0,width,height);
 }
 
 
 
 //body of the snake
 //x, y the body position
 function drawPoint(x,y)
 {
 
 // First draw a square 
 context.fillStyle = "black";
 context.fillRect(x,y,sqSize, sqSize);
 context.fill();
 
 
 // Then draw the square boundary
 context.strokeStyle="#FFFFFF";
 context.strokeRect(x,y,sqSize, sqSize);
 }
 
 //Draw snake 
 
 function drawSnake()
 {
 for(var i=0; i < snakeLength; i++)
 drawPoint(bodyX[i],bodyY[i]);
 }
 


 //checkCollision
 
 
function checkCollision()
 {
 

if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height)
 {
 

scoreDiv.innerHTML = "Score: " +score+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level:"+level+"&nbsp;&nbsp;&nbsp;&nbsp";


 alert("Dont give up keep trying😂😂");
 
 gameOver = true;
 clearTimeout(intervalId);
 }

 else if(snakeLength > 4)
 {
 
 if(checkSelfCollision(bodyX[0],bodyY[0]))
 {
 scoreDiv.innerHTML = "Score: " +score+"&nbsp;&nbsp;Level:"+level+"&nbsp;&nbsp;&nbsp;&nbsp";
 
 alert("keep trying you are almost there😂😂");
 gameOver = true;
 clearTimeout(intervalId);
 
 }
 }
 }
 
 
 
 function checkSelfCollision(x, y)
 {
 for (var i = 4; i < snakeLength; i++)
 if(x == bodyX[i] && y == bodyY[i])
 {
 return true;
 }
 return false;
 }
 


function checkFoodCollision(x, y)
 {
 for (var i = 0; i < snakeLength; i++)
 if(x == bodyX[i] && y == bodyY[i])
 {
 return true;
 }
 return false;
 }
 


 function eating()
 {
 if(eaten)
 {
 rX = Math.floor(width*Math.random()/sqSize)*sqSize;
 
 rY = Math.floor(height*Math.random()/sqSize)*sqSize;
 
 if(checkFoodCollision(rX,rY))
 eating();

 else
 eaten = false;
 }
 drawPoint(rX, rY);
 }
 
 
 
 function moveSnake()
 {
 for(var i=0; i < snakeLength; i++)
 {
 bodyX[i] += (vX[i]*sqSize);
 bodyY[i] += (vY[i]*sqSize);
 }
 
 for(var i=snakeLength-1; i>0; i--)
 {
 vX[i] = vX[i-1];
 vY[i] = vY[i-1];
 }
 eatin();
 }
 
 
 
 
 function eatin()
 {
 
if(bodyX[0] == rX && bodyY[0] == rY)
 {
 eaten = true;
 // calculate the new X & Y location 

 var newX = bodyX[snakeLength-1]-vX[snakeLength-1]*sqSize;
 
 var newY = bodyY[snakeLength-1]-vY[snakeLength-1]*sqSize;
 
 //Add the new part 
 bodyX.push(newX);
 bodyY.push(newY);
 
 //Initial velocity
 
 vX.push(vX[snakeLength-1]);

 vY.push(vY[snakeLength-1]);

 snakeLength++; // increment the snakelength
 
 score += 10; // increment score
 
 // check and increment level
 if((score%100) == 0)
 level++;
 
 // update score on webpage
 scoreDiv.innerHTML = "Score: " +score+"&nbsp;Level: "+level;
 }
 }
 
 
 
 function gameProcess()
 {
 
 intervalId = setTimeout(gameProcess, 1000/(6*level)); 
 
 clear();
 
 drawCanvasBoundary();
 
 eating();
 
 moveSnake();
 
 checkCollision();
 
 drawSnake();
 }
 
 window.addEventListener("load", init, true);