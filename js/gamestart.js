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
    
    var sprite = new Scene_Asset_Animation(1, 5);
    
    
    
    sprite.load('/images/dummy_anim.png', function(sprite) {
    	for(var i = 0; i < 3; i++) {
        	var obj = new Game_TestObject();
        	obj.sprite = sprite;
        	obj.x = 250;
        	obj.y = 100;
        	sceneGraph.add(obj);
        }
    });
    
    loop.start();
    
    loop.addTask(function() {
    	sceneGraph.update();
    }, 33);
    
    loop.addTask(function() {
    	viewport.render();
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
}); 