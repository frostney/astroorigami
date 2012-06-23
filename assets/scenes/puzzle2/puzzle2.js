function(sender, localization) {
	
	var canvasElement = null;
	var character = null;
	var animCurRow = 0;
	var animCurCell = 0;
	
	var backgroundName = 'background';
	var maxBackgrounds = 9;
	
	var backgrounds = [];
	
	//console.log(Lyria.Resource.name(sender + '/' + 'background', 'image'));
	
	//background.push();
	
	function onSceneActive() {
		
		
	    var StarAnimation = new Scene_Asset_Animation(1, 5);
	    StarAnimation.load(Lyria.Resource.name('star1.png', 'image'), function(StarAnimation) {
	    	for(var i = 0; i < 10; i++) {
	        	var obj = new Game_Star(StarAnimation);
	        	obj.position.x = 800*Math.random();
	        	obj.position.y = 100*Math.random() + 10;
	        	window.canvasEngine.sceneGraph.add(obj);
	        }
	    });
	    
	    
	    
	    var FireflyAnimation = new Scene_Asset_Animation(1, 6);
	    FireflyAnimation.load(Lyria.Resource.name('firefly.png', 'image'), function(FireflyAnimation) {
	    	for(var i = 0; i < 10; i++) {
	        	var obj = new Game_Firefly(FireflyAnimation);
	        	window.canvasEngine.sceneGraph.add(obj);
	        }
	    });
	}

	
	function update(dt) {		
		//$('.bird').css('margin-left', $('#' + sender + ' .panorama-container').css('margin-left'));
		
		if (canvasElement) {
			canvasElement.clearRect(0, 0, 20, 30);
			canvasElement.drawImage(bird, animCurCell * (-20), animCurRow * (-30));
		}
		
		animCurCell++;
		if (animCurCell > 5) {
			animCurCell = 0;
			animCurRow++;
		}
		
		if (animCurRow > 3) {
			animCurRow = 0;
			animCurCell = 0;
		}
	}
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push({
			filename: Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image')
		});
	}

	
	var angle = angle2 = angle3 = 0;
	
	function update(dt) {
		angle++;
		if (angle == 360.0) {
			angle = 0;
		}
		
		angle2 = angle2 + 0.5;
		if (angle2 == 360.0) {
			angle2 = 0;
		}
		
		angle3 = angle3 + 0.25;
		if (angle3 == 360.0) {
			angle3 = 0;
		}
		
		$('.pinwheel.small').rotate(angle);
		$('.pinwheel.medium').rotate(angle2);
		$('.pinwheel.big').rotate(angle3);
	}
	
	return {
		backgrounds: backgrounds,
		update: update,
		onSceneActive: onSceneActive
	}
}
