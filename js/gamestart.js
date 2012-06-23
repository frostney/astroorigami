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