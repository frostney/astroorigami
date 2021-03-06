function(sender, localization) {
	
	var backgrounds = [];
	
	var backgroundName = 'background';
	var maxBackgrounds = 2;
	
	renderTaskID = null;
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push({
			filename: Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image')
		});
	}
	
	
	
	function onSceneActive() {
		(function() {
			var viewport = new Scene_RenderTarget_Viewport($('#intro .background:first'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
		    var ShipSprite = new Scene_Asset_Sprite();
		    ShipSprite.load(Lyria.Resource.name('spazeship.png', 'image'), function(ShipSprite) {
	        	var obj = new Game_CrashingShip(ShipSprite);
	        	window.canvasEngine.sceneGraph.add(obj);
		    });
		    
		    var StripeSprite = new Scene_Asset_Sprite();
		    StripeSprite.load(Lyria.Resource.name('fallingStripes.png', 'image'), function(StripeSprite) {
		    	for(var i = 0; i < 100; i++) {
		    		var obj = new Game_FallingStripes(StripeSprite);
		        	window.canvasEngine.sceneGraph.add(obj);
		    	}
		    });
		    
		    console.log('test');
		    
		    $('#intro').on('click', function() {
		    	window.canvasEngine.loop.removeTask(renderTaskID);
				window.canvasEngine.sceneGraph.clear();
		    	Lyria.SceneManager.show('intro2');
		    });
		    
		}).delay(100);
	}
	
	function onSceneDeactived() {
		
	}
	
	function update() {
		
	}
	
	return {
		backgrounds: backgrounds,
		update: update,
		onSceneActive: onSceneActive,
		onSceneDeactived: onSceneDeactived,
	}
}
