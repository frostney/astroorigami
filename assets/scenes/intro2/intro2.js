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
			var viewport = new Scene_RenderTarget_Viewport($('#intro2 .background:first'), window.canvasEngine.sceneGraph);
			renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
		    	viewport.render(loop);
		    }, 33);
			
		    $('#intro2').on('click', function() {
		    	window.canvasEngine.loop.removeTask(renderTaskID);
				window.canvasEngine.sceneGraph.clear();
		    	Lyria.SceneManager.show('puzzle1');
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
