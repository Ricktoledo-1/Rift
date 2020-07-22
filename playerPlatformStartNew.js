var gameWin = document.getElementById("gameWindow");
var foreGround = document.getElementById("foreground");
var foreGround2 = document.getElementById("foreground2");
var gameWidth = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('width'));
var gameHeight = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('height'));
var sceneChange = false;
var gravity = 5;
var jumpLimit = 6; 
var foreSpeed = 3;
var backSpeed = 1;
var inAir = true;
var gameloop;
var attack = false;
var lives = 150;
var lifeBox = document.getElementById("lifeBar");
var audio = document.getElementById("audio");
var powerUp= document.getElementById("powerUp");
powerUp.hit=false;
var startWindow = document.getElementById("startWindow");
var rulesWindow = document.getElementById("rulesWindow");
var gameWin = document.getElementById("gameWindow");
var gameOverWindow = document.getElementById("gameOver");
var bStart = document.getElementById("startButton");
var bRestart = document.getElementById("restartButton");
var bRules = document.getElementById("rulesButton");
var bRulesReset = document.getElementById("resetRulesButton");
bStart.addEventListener("click", hideStart);
var powerUpOn=false;
var kill=false;
var bubbles = [];
var bossLevel = false;
var win = document.getElementById("win");

function hideStart(){
	startWindow.style.visibility = "hidden";
	audio.play();

}
function showStart(){
	startWindow.style.visibility = "visible";
	audio.play();

}
function hideWin(){
	win.style.visibility = "hidden";
}
function hideRulesWindow(){
	rulesWindow.style.visibility="hidden";
}
bRulesReset.addEventListener("click", hideRulesWindow);

function showRulesWindow(){
	rulesWindow.style.visibility="visible";
}

bRules.addEventListener("click", showRulesWindow);


function hideGameOverWindow(){
	gameOverWindow.style.visibility="hidden";
	lives=150;
	lifeBox.style.width = lives + "px";
	gameloop = setInterval(checkDirection,30);
	player.style.left = gameWidth/35 + "px";
	player.style.top = gameHeight/2  + "px";
	for(var et=0; et<enemyArray.length; et++){enemyArray[et].hit=false;}
}
function showwin(){
	win.style.visibility="visibile";
}
function showGameOverWindow(){
	gameOverWindow.style.visibility="visible";
}

bRestart.addEventListener("click", hideGameOverWindow);

function loseLife(){
	lives-=50;
	lifeBox.style.width = lives + "px";
	if(lives==0){showGameOverWindow();
		clearInterval(gameloop)};
		powerUpOn= false;
}

//endwindowcode
var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var spaceBarDown = false;
var squarePointArray = [{x:200, y:507}, {x: 250, y:457}, {x:300, y:457},{x:250, y:507},{x:300, y:507},{x:350, y:507},{x:500, y:507}, {x:550, y:507}, {x:600, y:507},{x:570, y:457},{x:620, y:407},
{x:670, y:407},{x:720, y:357},{x:770, y:357},{x:870, y:507},{x:920, y:457},{x:970, y:407},{x:1020, y:407},{x:1070, y:357},{x:1120, y:327},{x:1230, y:507},{x:1230, y:457}];
var enemyProperties = [{x:250, y:378, endLeft:240, endRight:260, image:"images/enemy2.png"},{x:1225, y:377, endLeft:1210, endRight:1235, image:"images/enemy2.png"}, {x:620, y:477, endLeft:600, endRight:790, image:"images/enemy3.png"}];
var boss = document.getElementById("boss");
boss.width=150;
boss.height=150;
boss.hit=false;
boss.kill=false;

var obstacleArray = [];
for(var i=0;i < squarePointArray.length; i++){
var obstacle = document.createElement("div");
gameWin.appendChild(obstacle);
obstacle.className = "obstacle";
obstacle.width = 50;
obstacle.height = 50;

obstacle.style.left = squarePointArray[i].x + "px";
obstacle.style.top = squarePointArray[i].y + "px";
obstacleArray.push(obstacle);
}

foreGround2.style.left = gameWidth + "px";

gameloop = setInterval(checkDirection,30);
var enemyArray = [];
for (var i=0; i < 3; i++){
	var enemy =  document.createElement("img");
	enemy.setAttribute("src", enemyProperties[i].image);
	enemy.setAttribute("class", "enemy");
	gameWin.appendChild(enemy);
	enemy.width = 80;
	enemy.height = 80;
	enemy.speed = -2;
	enemy.hit = false;
	enemy.style.left=enemyProperties[i].x + "px";
	enemy.style.top=enemyProperties[i].y + "px";
	enemyArray.push(enemy);
	enemy.timeout;
	enemy.kill = false;
}
//$(".enemy").animate({"left": "-80px"},2000); //$ when referencing Jquery .enemy moves the whole class # moves just one image. animate is a jquery. 2000 = 2 seconds.
	
function resetEnemy(enemy) {
	enemy.hit = false; 
}

function collide(hitOne,hitTwo){
		if((hitOne.offsetLeft < (hitTwo.offsetLeft + hitTwo.width - hitOne.width*.25)) && 
		(hitOne.offsetLeft > (hitTwo.offsetLeft - hitOne.width*.75))){
			if((hitOne.offsetTop > (hitTwo.offsetTop - hitOne.height)) && 
			(hitOne.offsetTop < (hitTwo.offsetTop + hitTwo.height))){
				if(!hitTwo.hit){
				if (hitTwo.id=="powerUp"){
					powerUpOn=true;
				
				}	else if (hitTwo.className=="bubbles"){
					loseLife();
				}

				else {
					if(attack){
					hitTwo.style.visibility="hidden";
					hitTwo.hit=true; console.log(hitTwo.id); 
					if(hitTwo.id=="boss"){console.log("enter");showStart();}
					
				
				     }
					else {
						loseLife();

					}
				}
				hitTwo.hit = true;
				hitTwo.timeout = setTimeout(function(){hitTwo.hit=false;},500);
				}
			}
	 }
}

function collideTop(hitOne,hitTwo){
		if((hitOne.offsetLeft < (hitTwo.offsetLeft + hitTwo.width - hitOne.width*.25)) && 
		(hitOne.offsetLeft > (hitTwo.offsetLeft - hitOne.width*.75))){
			if((hitOne.offsetTop > (hitTwo.offsetTop - hitOne.height * 2)) && 
			(hitOne.offsetTop < (hitTwo.offsetTop))){
			
				if(!hitTwo.kill){
					hitTwo.style.visibility="hidden";
					hitTwo.hit=true;
					kill=true;
					hitTwo.timeout = clearTimeout();
					if(hitTwo.id=="boss"){showStart();}

				}
				console.log(kill);
		}
	}

}

function createBubble(){
	var myBubble = document.createElement("div");
	gameWin.appendChild(myBubble);
	myBubble.setAttribute("class","bubbles");
	var bubbleSize =  50;
	myBubble.style.width = bubbleSize + "px";
	myBubble.style.height =bubbleSize + "px";
	myBubble.height= bubbleSize;
	myBubble.width= bubbleSize;
	myBubble.style.borderRadius =bubbleSize + "px";
	myBubble.style.left = boss.offsetLeft + "px";
	myBubble.style.top = boss.offsetTop + boss.offsetTop /2 + "px";
	myBubble.vx = Math.random() * -10;
	//push() adds an element, in this case myBubble, to an array, in this case bubbles array.
	bubbles.push(myBubble);
}


function checkDirection(){
	collide(player, powerUp);
	collide(player, boss);
	collideTop(player, boss);
	for (var e=0; e < enemyArray.length; e++){
		collide(player, enemyArray[e]);
		collideTop(player, enemyArray[e]);
		if((!sceneChange)&&(!bossLevel)){
		 enemyArray[e].style.left = enemyArray[e].offsetLeft + enemyArray[e].speed + "px";
		 if(enemyArray[e].offsetLeft<enemyProperties[e].endLeft){
		 	enemyArray[e].speed=2;
		 	enemyArray[e].setAttribute("class", "enemy flip");
		 }
		 else if(enemyArray[e].offsetLeft>enemyProperties[e].endRight){
		 	enemyArray[e].speed=-2;
		 enemyArray[e].setAttribute("class", "enemy");
		 }
		}
	}	

	for (var i = 0; i < bubbles.length;i++){
		collide(player,bubbles[i]);
		var posH = bubbles[i].offsetLeft + bubbles[i].vx;
		bubbles[i].style.left = posH + "px";
		if(bubbles[i].offsetLeft < -gameWidth){
		gameWin.removeChild(bubbles[i]);
		bubbles.splice(i,1);

}
	}

	/*left arrow*/
	if(leftArrowDown){
				player.style.left = player.offsetLeft - player.speed + "px";
			
			//collision detection
		for(var rt=0; rt < obstacleArray.length; rt++){
			if((player.offsetLeft < obstacleArray[rt].offsetLeft + obstacleArray[rt].width) &&
				(player.offsetLeft > obstacleArray[rt].offsetLeft - player.width)) { //whenever you want to move player, you use player.style.left or right, etc code.
				if ((player.offsetTop > obstacleArray[rt].offsetTop - player.height) &&
				(player.offsetTop < obstacleArray[rt].offsetTop + obstacleArray[rt].height)) {
					player.style.left = obstacleArray[rt].offsetLeft + obstacleArray[rt].width + "px"; 
				}
			}
		}
			//end collission detection for left
	 		if(player.offsetLeft < 0){ 
				//player.style.left = "0px"; 
				player.style.left = 0;
			}

	}
	/*right arrow*/
	if(rightArrowDown){
		player.style.left = player.offsetLeft + player.speed + "px";
	for(var rt=0; rt < obstacleArray.length; rt++){
			if((player.offsetLeft < obstacleArray[rt].offsetLeft + obstacleArray[rt].width) &&
				(player.offsetLeft > obstacleArray[rt].offsetLeft - player.width)) { //whenever you want to move player, you use player.style.left or right, etc code.
				if ((player.offsetTop > obstacleArray[rt].offsetTop - player.height) &&
				(player.offsetTop < obstacleArray[rt].offsetTop + obstacleArray[rt].height)) {
					player.style.left = obstacleArray[rt].offsetLeft - player.width + "px"; 
				}
			}
		}

		if(player.offsetLeft > gameWidth - player.width){
			sceneChange=true;
		}
	}	

	/*up arrow*/
	if(upArrowDown){
	//if((player.offsetTop > gameHeight * .6) && (player.offsetLeft > gameWidth * .5)){console.log("enter");player.jump = 9;}
		player.style.top = player.offsetTop - player.jump + "px"; //'-'' subtract value from original value
		player.jump -= 5; //takes away 5 px from ^ code
		if(player.jump < jumpLimit){ //to set a limit you use an if statement.
			player.jump = 0; //makes it stop after a while
		}
			for(var dt=0; dt > obstacleArray.length; dt++){
			if((player.offsetLeft < obstacleArray[dt].offsetLeft + obstacleArray[dt].width) &&
				(player.offsetLeft > obstacleArray[dt].offsetLeft - player.width)) { //whenever you want to move player, you use player.style.left or right, etc code.
				if ((player.offsetTop > obstacleArray[dt].offsetTop - player.height) &&
				(player.offsetTop < obstacleArray[dt].offsetTop + obstacleArray[dt].height)) {
					player.style.top = obstacleArray[dt].offsetTop + obstacleArray[dt].height + "px"; 
			} 
		} 
     } 

	}

	/*down arrow*/
	if(inAir){
		player.style.top = player.offsetTop + gravity + "px"; //took this code from playerControlStart.js code, just changed gravity part

		if(player.offsetTop > gameHeight * 0.8){
			//player.style.top= gameHeight - player.height + "px";
			player.style.top= gameHeight * 0.8 + "px"; //reset player to 80% height. Stops ont he ground.
			player.jump = 45;
		}

		for(var dt=0; dt < obstacleArray.length; dt++){
			if((player.offsetLeft < obstacleArray[dt].offsetLeft + obstacleArray[dt].width) &&
				(player.offsetLeft > obstacleArray[dt].offsetLeft - player.width)) { //whenever you want to move player, you use player.style.left or right, etc code.
				if ((player.offsetTop > obstacleArray[dt].offsetTop - player.height) &&
				(player.offsetTop < obstacleArray[dt].offsetTop + obstacleArray[dt].height)) {
					player.style.top = obstacleArray[dt].offsetTop - player.height + "px"; 
					player.jump = 45;
			} 
		} 
     } 
	}
	if(sceneChange){console.log("test");
		foreGround.style.left = foreGround.offsetLeft - foreSpeed + "px";
		foreGround2.style.left = foreGround2.offsetLeft - foreSpeed + "px";
		for(var dt=0; dt < obstacleArray.length; dt++){obstacleArray[dt].style.left = obstacleArray[dt].offsetLeft - foreSpeed + "px";};
		for(var et=0; et < enemyArray.length; et++){enemyArray[et].style.left = enemyArray[et].offsetLeft - foreSpeed + "px";};
		powerUp.style.left = powerUp.offsetLeft - foreSpeed + "px";
	   boss.style.left = boss.offsetLeft - foreSpeed + "px";
		if(foreGround2.offsetLeft < -gameWidth) {
		sceneChange=false;
		player.style.left = 100 + "px";
		} else if (foreGround.offsetLeft <= -gameWidth){
			sceneChange=false;
			bossLevel = true;
			player.style.left = 100 + "px";
			setInterval(createBubble, 1000);
			for(var et=0; et<enemyArray.length; et++){enemyArray[et].hit=false;}
		}
	}
	if(powerUpOn){
		player_src = player.src.split('/').pop();

	if(leftArrowDown || rightArrowDown ){
	   	//console.log(powerUpOn);
		//the split looks at the src string (string that points to the picture file) and looks at all the "/" and takes off the information after the last "/". In this case, it will be the file name of the image.
		if(player_src != "boysaber.gif"){
			player.src = "images/boysaber.gif";
		  }
		}
		else if(attack){
			if(player_src != "attack.gif"){
			player.src = "images/attack.gif";
		  }
		}
		else{
			player.src = "images/playerwithsaber.png";
	   }
	}
	else if(leftArrowDown || rightArrowDown ){
		//the split looks at the src string (string that points to the picture file) and looks at all the "/" and takes off the information after the last "/". In this case, it will be the file name of the image.
		player_src = player.src.split('/').pop();
		if(player_src != "boywalk.gif"){
			player.src = "images/boywalk.gif";
		}
	} else if(upArrowDown){
		player_src = player.src.split('/').pop();
		if(player_src != "boyjump.png"){
			player.src = "images/boyjump.png";
		}
	}
	else {
		player.src = "images/boywalk.png";
	}
	
}

