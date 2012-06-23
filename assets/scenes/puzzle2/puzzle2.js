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
		// TODO: Timeout 'cuz Chrome is too faaast
		setTimeout(function() {
		// set character to the left of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 200, left : scenePos.left + 10});
		/*
		 * Move character to mouse click position
		 */
		var newCharPos = scenePos.left + 10;
		var interval;
		$('#viewport').live('click', function(event) {
			if (interval) {
				clearInterval(interval);
			}
			newCharPos = event.pageX;
			interval = window.canvasEngine.loop.addTask(function moveChar(loop) {
				
				var delta = loop.timeElapsed;
				
				var charCurPosX = $('.character:visible').offset().left;
				if (charCurPosX > (newCharPos+10)) {
					$('.character:visible').offset({left : charCurPosX - 5 });
				} else if (charCurPosX < (newCharPos-10)) {
					$('.character:visible').offset({left : charCurPosX + 5 });
				} else {
					window.canvasEngine.loop.removeTask(interval);
				}
				
			}, 50);
			
		});
		}, 100);
		
		
		
		
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

	
	var angle = 0;
	
	function update(dt) {
		angle++;
		if (angle == 360) {
			angle = 0;
		}
		
		$('.pinwheel').rotate(angle);
	}
	
	return {
		backgrounds: backgrounds,
		update: update,
		onSceneActive: onSceneActive
	}
}
