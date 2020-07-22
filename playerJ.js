


var player = document.getElementById("player");
var jumpSnd = document.getElementById("jump"); //jumping sound

player.style.left = gameWidth/35 + "px";
player.style.top = gameHeight/2  + "px";

player.speed = 5;
player.jump = 40; //sets how big you want the jump to be
player.width = 50;
player.height =  67;
var player_src = player.src.split('/').pop();


//var gameloop = setInterval(checkDirection,60);

document.addEventListener('keydown', function(event){
	switch(event.keyCode) {
		case 37:
			leftArrowDown = true;
			player.className = "flip";
			break;
		case 39: 
			rightArrowDown = true;
			player.className = "";
			break;
		case 38: 
			upArrowDown = true;
			jumpSnd.currentTime = 0; //ques when sound plays
			jumpSnd.play();
			break;
		case 40: 
			downArrowDown = true;
			break;
		case 32: 
			attack = true; player.style.width=70 + "px";
			break;
	}
});

document.addEventListener('keyup', function(event){
	switch(event.keyCode) {
		case 37:
			leftArrowDown = false;
			break;
		case 39: 
			rightArrowDown =false;
			break;
		case 38: 
			upArrowDown = false;
			//jumpSnd.stop();
			
			break;
		case 40: 
			downArrowDown = false;
			break;

			case 32: 
			attack = false; player.style.width=50 + "px";
			break;
	}

});
