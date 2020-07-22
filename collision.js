function collide(hitOne,hitTwo){
		if((hitOne.offsetLeft < (hitTwo.offsetLeft + hitTwo.width - hitOne.width*.25)) && 
		(hitOne.offsetLeft > (hitTwo.offsetLeft - hitOne.width*.75))){
			if((hitOne.offsetTop > (hitTwo.offsetTop - hitOne.height)) && 
			(hitOne.offsetTop < (hitTwo.offsetTop + hitTwo.height))){
				if(!hitTwo.hit){
				runCollision();
				hitTwo.hit = true;
				}
			}
		}

}