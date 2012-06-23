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

	Lyria.SceneManager.show('startScene');

	(function animLoop() {
		requestAnimFrame(animLoop);
		Lyria.SceneManager.render();
		Lyria.SceneManager.update(0);
	})();

	
	var loop = new Scene_Loop();
	
    var sceneGraph = new Scene_SceneGraph();
    
    var viewport = new Scene_RenderTarget_Viewport($('#viewport'), sceneGraph);
    
    var sprite = new Scene_Asset_Sprite();
    
    
    
    sprite.load('/images/dummy.png', function(sprite) {
    	for(var i = 0; i < 1000; i++) {
        	var obj = new Game_TestObject();
        	obj.sprite = sprite;
        	obj.x = 250;
        	obj.y = 100;
        	sceneGraph.add(obj);
        }
    });
    
    loop.start();
    
    loop.addTask(function() {
    	viewport.render();
    }, 16);

	
	// debug content
	astro.inventory.addItem ('stone');
	astro.inventory.addItem ('wood');

	// refresh inventory with inventorydata
	astro.inventory.refreshInventory();
	$('.inventory .item .image').draggable({ 
		opacity: 0.7,
		helper: 'clone',
		cancle: 'button',
		revert: 'invalid'
	});
	
	$(".inventory .item").droppable({
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop: function( event, ui ) {
			astro.inventory.useItem(ui.draggable.parent().attr('rel'), $(this).attr('rel'));
		}
	});
}); 