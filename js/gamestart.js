window.$$ID_COUNT = 0;
window.setID = function(object) {
	if(object.$id == undefined) {
		object.$id = $$ID_COUNT;
		$$ID_COUNT++;
	}
},

$(document).ready(function() {

	Lyria.SceneManager.add(Lyria.Scene('startScene'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle1'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle2'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle3'));
	Lyria.SceneManager.add(Lyria.Scene('endScene'));

	Lyria.SceneManager.show('puzzle2');

	(function animLoop() {
		requestAnimFrame(animLoop);
		Lyria.SceneManager.render();
		Lyria.SceneManager.update(0);
	})();
	
	
	
	window.canvasEngine = {};
	var loop = window.canvasEngine.loop =  new Scene_Loop();
    var sceneGraph = window.canvasEngine.sceneGraph = new Scene_SceneGraph();
    var viewport = window.canvasEngine.viewport = new Scene_RenderTarget_Viewport($('#viewport'), sceneGraph);
    loop.start();
    loop.addTask(function(loop) {
    	sceneGraph.update(loop);
    }, 33);
    loop.addTask(function(loop) {
    	viewport.render(loop);
    }, 33);

	
	// debug content
	astro.inventory.addItem ('scissors');
	astro.inventory.addItem ('pillow');

	// refresh inventory with inventorydata
	astro.inventory.refreshInventory();
	
	$('.inventory').on('click', '.useItem', function() {
		alert('using item');
		// TODO pass element where player is standing currently
		astro.inventory.useItem($(this).parent().attr('rel'), '');
	});
	
	$('.dialog .button').on('click', function() {
		console.log('start dialog');
		astro.dialog.turnPage();
	});
	
	$('#pickup .button').on('click', function() {
		console.log('pickup button click')
		var character = $('#viewport .character:visible');
		$('.interactableElem:visible').each(function(index) {
			console.log('testing for a hit ')
		  	if (hitTest(character, $(this))) {
		  		console.log('hit sth')

		  		var rel = $(this).attr('rel');
		  		console.log(rel)
		  		astro.inventory.addItem(rel);
		  		$(this).remove();
		  	}
		});
	});
	
	$('#talk .button').on('click', function() {
		console.log('talk button click')
		var character = $('#viewport .character:visible');
		$('.interactableNpc:visible').each(function(index) {
			console.log('testing for a hit ')
		  	if (hitTest(character, $(this))) {
		  		var rel = $(this).attr('rel');
		  		astro.dialog.startDialog(rel);
		  		return false;
		  	}
		});
	});
	
	// set character into the scene
	var scenePos = $('#viewport').offset();
	$('.character:visible').offset({top : scenePos.top + 200, left : scenePos.left + 10});
	/*
	 * Move character to mouse click position
	 */
	var newCharPos = scenePos.left + 10;
	var interval;
	$('#viewport').live('click', function(event) {
		if (interval) {
			window.canvasEngine.loop.removeTask(interval);
		}
		newCharPos = event.pageX;
		interval = window.canvasEngine.loop.addTask(function moveChar(loop) {
			
			var delta = loop.timeElapsed;
			
			var charCurPosX = $('.character:visible').offset().left;
			if (charCurPosX > (newCharPos+10)) {
				$('.character:visible').offset({left : charCurPosX - .2 * delta});
			} else if (charCurPosX < (newCharPos-10)) {
				$('.character:visible').offset({left : charCurPosX + .2 * delta});
			} else {
				window.canvasEngine.loop.removeTask(interval);
			}
			
		}, 33);
		
	});
	
}); 

function hitTest(a, b) {
	var aPos = a.offset();
	var bPos = b.offset();
	var aObj = {
		left : aPos.left,
		right : aPos.left + a.width(),
		top : aPos.top,
		bottum : aPos.top + a.height()
	};
	
	var bObj = {
		left : bPos.left,
		right : bPos.left + b.width(),
		top : bPos.top,
		bottum : bPos.top + b.height()
	};


	// http://tekpool.wordpress.com/2006/10/11/rectangle-intersection-determine-if-two-given-rectangles-intersect-each-other-or-not/
	return !(bObj.left > aObj.right || bObj.right < aObj.left || bObj.top > aObj.bottom || bObj.bottom < aObj.top
	);
}
