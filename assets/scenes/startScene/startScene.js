function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 8;
	
	var backgrounds = [];
	
	renderTaskID = null;
	
	function onSceneActive() {
		$('.character').removeClass('hidden');
		// set character into the beginning of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 280, left : scenePos.left + 10});
		
		(function() {
			var viewport = new Scene_RenderTarget_Viewport($('#startScene'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
		    var StarAnimation = new Scene_Asset_Animation(1, 5);
		    StarAnimation.load(Lyria.Resource.name('star1.png', 'image'), function(StarAnimation) {
		    	for(var i = 0; i < 25; i++) {
		        	var obj = new Game_Star(StarAnimation);
		        	obj.position.x = 800*Math.random();
		        	obj.position.y = 100*Math.random() + 10;
		        	window.canvasEngine.sceneGraph.add(obj);
		        }
		    });
		    
		    var fireflies = [];
		    
		    $('#startScene').on('mousemove', function(event) {
		    	
		    	for(var i = 0; i < fireflies.length; i++) {
		    		fireflies[i].center = new Scene_Vector(event.offsetX, event.offsetY);
		    	}
		    	
		    });
		    
		    
		    var FireflyAnimation = new Scene_Asset_Animation(1, 6);
		    FireflyAnimation.load(Lyria.Resource.name('firefly.png', 'image'), function(FireflyAnimation) {
		    	for(var i = 0; i < 10; i++) {
		        	var obj = new Game_Firefly(FireflyAnimation);
		        	window.canvasEngine.sceneGraph.add(obj);
		        	fireflies.push(obj);
		        }
		    });
		}).delay(100);
		
		// check if sth was picked up and if player has everything for this scene give him the possibility to go to the next scene
		$('body').off('sthWasPickedUp');
		$('body').on('sthWasPickedUp', function() {
			// check if player has needed items in inventory
			if (astro.inventory.content['pillow'] && astro.inventory.content['rope']) {
				$('#startScene .interactableNpc[rel=sceneChange]').removeClass('hidden');
			}
		});

	}
	
	function onSceneDeactived() {
		window.canvasEngine.loop.removeTask(renderTaskID);
		window.canvasEngine.sceneGraph.clear();
	}
	
	function update() {
		
	}
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push({
			filename: Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image')
		});
	}
	
	return {
		backgrounds: backgrounds,
		update: update,
		onSceneActive: onSceneActive,
		onSceneDeactived: onSceneDeactived,
	}
}
