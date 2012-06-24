function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 7;
	
	var backgrounds = [];
	
	renderTaskID = null;

	function onSceneActive() {
		
		(function() {
			var viewport = new Scene_RenderTarget_Viewport($('#puzzle1'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
			
			 var SmallGuy = new Scene_Asset_Sprite();
			 SmallGuy.load(Lyria.Resource.name('SmallGuy.png', 'image'), function(SmallGuy) {
		        	var obj = new Game_Star(SmallGuy);
		        	obj.position.x = 100;
		        	obj.position.y = 250;
		        	window.canvasEngine.sceneGraph.add(obj);
			    });
			
			
		    var StarAnimation = new Scene_Asset_Animation(1, 5);
		    StarAnimation.load(Lyria.Resource.name('star1.png', 'image'), function(StarAnimation) {
		    	for(var i = 0; i < 30; i++) {
		        	var obj = new Game_Star(StarAnimation);
		        	obj.position.x = 800*Math.random();
		        	obj.position.y = 100*Math.random() + 10;
		        	window.canvasEngine.sceneGraph.add(obj);
		        }
		    });
		}).delay(100);
		
		
		// set character into the beginning of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 200, left : scenePos.left + 10});
		
		
		// check if sth was picked up and if player has everything for this scene give him the possibility to go to the next scene
		$('body').off('sthWasPickedUp');
		$('body').on('sthWasPickedUp', function() {
			console.log('sth picked up')
			// check if player has needed items in inventory
			if (astro.inventory.content['partyHat']) {
				$('#puzzle1 .interactableNpc[rel=sceneChange]').removeClass('hidden');
			}
		});
		
		// check if s.o. was talked to
		$('body').off('talkedToSO');
		$('body').on('talkedToSO', function() {
			
			// check if player has needed items in inventory
			if (astro.npc.content['strongGuy'].state == 1) {
				$('#puzzle1 .interactableElem[rel=partyHat]').removeClass('hidden');
				$('.object.haudenlukas-ball').addClass('hit');
				$('#viewport').addClass('animated').addClass('shake');
			}
		});
	}

	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push(Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image'));

	}
	
	
	var angle = 0;
	
	function onSceneDeactived() {
		window.canvasEngine.loop.removeTask(renderTaskID);
		window.canvasEngine.sceneGraph.clear();
	}
	
	function update(dt) {
		angle += 0.33;
		if (angle == 360.0) {
			angle = 0;
		}
		
		$('.ferriswheel').rotate(angle);
	}
	
	return {
		backgrounds: backgrounds,
		update: update,
		onSceneActive: onSceneActive,
		onSceneDeactived: onSceneDeactived,
	}
}
