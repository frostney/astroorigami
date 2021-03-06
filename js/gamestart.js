window.$$ID_COUNT = 0;
window.setID = function(object) {
	if(object.$id == undefined) {
		object.$id = $$ID_COUNT;
		$$ID_COUNT++;
	}
},

$(document).ready(function() {
	play_multi_sound('audio_background', 0.1, true);
	
	
	window.canvasEngine = {};
	var loop = window.canvasEngine.loop =  new Scene_Loop();
    var sceneGraph = window.canvasEngine.sceneGraph = new Scene_SceneGraph();
    var sceneGraph_Character = window.canvasEngine.sceneGraph_Character = new Scene_SceneGraph();
    loop.start();
    loop.addTask(function(loop) {
    	sceneGraph.update(loop);
    	sceneGraph_Character.update(loop);
    }, 33);

	Lyria.SceneManager.add(Lyria.Scene('gametitle'));
	Lyria.SceneManager.add(Lyria.Scene('credits'));
	Lyria.SceneManager.add(Lyria.Scene('intro'));
	Lyria.SceneManager.add(Lyria.Scene('intro2'));
	Lyria.SceneManager.add(Lyria.Scene('startScene'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle1'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle2'));
	Lyria.SceneManager.add(Lyria.Scene('puzzle3'));
	Lyria.SceneManager.add(Lyria.Scene('endScene'));

	Lyria.SceneManager.show('gametitle');

	(function animLoop() {
		requestAnimFrame(animLoop);
		Lyria.SceneManager.render();
		Lyria.SceneManager.update(0);
	})();
/*
	$('.character').removeClass('hidden');
	astro.inventory.addItem('pinWheel');
	astro.inventory.addItem('partyHat');
	astro.inventory.addItem('ticket');*/
	
	// refresh inventory with inventorydata
	astro.inventory.refreshInventory();
	
	$('.inventory').on('click', '.useItem', function() {
		var character = $('#viewport .character:visible');
		var relItem = $(this).parent().attr('rel');
		$('.interactableObj:visible,.interactableNpc:visible').each(function(index) {
		  	if (hitTest(character, $(this))) {
		  		var relObj = $(this).attr('rel');
		  		astro.inventory.useItem(relItem, relObj);
		  		return false;
		  	}
		});
	});
	
	$('.dialog .button').on('click', function() {
		console.log('start dialog');
		astro.dialog.turnPage();
	});
	
	$('#pickup').on('click', function() {
		// stop character movement
		if (interval) {
			CharacterObj.mode = idleDirection;
			window.canvasEngine.loop.removeTask(interval);
		}
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
		  		$('body').trigger('sthWasPickedUp');
		  		return false;
		  	}
		});
	});
	
	$('#talk').on('click', function() {
		// stop character movement
		if (interval) {
			CharacterObj.mode = idleDirection;
			window.canvasEngine.loop.removeTask(interval);
		}
		console.log('talk button click')
		var character = $('#viewport .character:visible');
		$('.interactableNpc:visible').each(function(index) {
			console.log('testing for a hit ')
		  	if (hitTest(character, $(this))) {
		  		var rel = $(this).attr('rel');
		  		if (rel == 'sceneChange') {
		  			window.canvasEngine.sceneGraph.clear();
		  			Lyria.SceneManager.show($(this).attr('next'));
		  		} else if (rel == 'tree') {
		  			astro.inventory.addItem('scissors');
		  			astro.inventory.addItem('cherries');
		  		} else {
		  			astro.dialog.startDialog(rel);
		  		}
		  		return false;
		  	}
		});
	});
	
	// set character into the beginnig of the scene
	var scenePos = $('#viewport').offset();
	$('.character:visible').offset({top : scenePos.top + 280, left : scenePos.left + 10});
	
	
	
	console.log($('.animatedCharacter'));
	
	var viewport = new Scene_RenderTarget_Viewport($('.animatedCharacter'), window.canvasEngine.sceneGraph_Character);
	renderTaskID = window.canvasEngine.loop.addTask(function(loop) {
    	viewport.render(loop);
    }, 33);
	
    var Astronaut = new Scene_Asset_Animation(3, 32);
    var CharacterObj;
    Astronaut.load(Lyria.Resource.name('astronaut_sheet.png', 'image'), function(Astronaut) {
    	CharacterObj = new Game_Humanoid(Astronaut);
    	window.canvasEngine.sceneGraph_Character.add(CharacterObj);
    });
    
	
    
    var idleDirection = 'idle_right';
    
	/*
	 * Move character to mouse click position
	 */
	var newCharPos = scenePos.left + 10;
	var interval;
	$('#viewport').live('click', function(event) {
		if (interval) {
			window.canvasEngine.loop.removeTask(interval);
			//character.idle
			CharacterObj.mode = idleDirection;
		}
		
		// just listen for clicks if character is visible
		if ($('.character').is(':visible')) {

			newCharPos = event.pageX;
			
			interval = window.canvasEngine.loop.addTask(function moveChar(loop) {
				
				var delta = loop.timeElapsed;
				
				var charCurPosX = $('.character:visible').offset().left;
				if (charCurPosX > (newCharPos+10)) {
					$('.character:visible').offset({left : charCurPosX - .2 * delta});
					CharacterObj.mode = 'move_right';
					idleDirection = 'idle_left';
				} else if (charCurPosX < (newCharPos-10)) {
					$('.character:visible').offset({left : charCurPosX + .2 * delta});
					CharacterObj.mode = 'move_left';
					idleDirection = 'idle_right';
				} else {
					CharacterObj.mode = idleDirection;
					window.canvasEngine.loop.removeTask(interval);
				}
				
			}, 33);
			
			lastCharPos = newCharPos;
		}
	});
	
	$('.interactableNpc[rel=sceneChange]:visible').live('click', function() {
		window.canvasEngine.sceneGraph.clear();
		Lyria.SceneManager.show($(this).attr('next'));
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

	var channel_max = 10;										// number of channels
	audiochannels = new Array();
	for (var a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;							// expected end time for this channel
	}
	function play_multi_sound(s, volume, play) {
		for (var a=0; a<audiochannels.length; a++) {
			thistime = new Date();
			if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
				if (!document.getElementById(s) || !document.getElementById(s).duration) {
					return;
				}
				audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
				audiochannels[a]['channel'].src = document.getElementById(s).src;
				audiochannels[a]['channel'].load();
				audiochannels[a]['channel'].volume = volume;
				if (play) {
					audiochannels[a]['channel'].play();
				} else {
					audiochannels[a]['channel'].pause();
				}
				
				break;
			} else {
				// still playing?
				if (!play) {
					audiochannels[a]['channel'].pause();
				}
			}
		}
	}
