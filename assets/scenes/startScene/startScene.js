function(sender, localization) {
	
	var backgrounds = [];
	
	renderTaskID = null;
	
	function onSceneActive() {
		(function() {
			var viewport = new Scene_RenderTarget_Viewport($('#startScene'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
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
