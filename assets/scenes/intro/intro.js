function(sender, localization) {
	
	var backgrounds = [];
	
	var backgroundName = 'background';
	var maxBackgrounds = 9;
	
	renderTaskID = null;
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push({
			filename: Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image')
		});
	}
	
	
	
	function onSceneActive() {
		(function() {
			var viewport = new Scene_RenderTarget_Viewport($('#'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
		    var ShipSprite = new Scene_Asset_Sprite();
		    ShipSprite.load(Lyria.Resource.name('spazeship.png', 'image'), function(ShipSprite) {
		    	for(var i = 0; i < 10; i++) {
		        	var obj = new Game_CrashingShip(ShipSprite);
		        	window.canvasEngine.sceneGraph.add(obj);
		        }
		    });
		}).delay(100);
	}
	
	function onSceneDeactived() {
		loop.removeTask(renderTaskID);
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
