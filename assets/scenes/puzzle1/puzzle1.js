function(sender, localization) {
	
	var backgrounds = [];
	
	function onSceneActive() {
		// set character into the beginning of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 200, left : scenePos.left + 10});
		
		
		// check if sth was picked up and if player has everything for this scene give him the possibility to go to the next scene
		$('body').off('sthWasPickedUp');
		$('body').on('sthWasPickedUp', function() {
			// check if player has needed items in inventory
			if (astro.inventory.content['pinWheel']) {
				$('#startScene .interactableNpc[rel=sceneChange]').removeClass('hidden');
			}
		});
	}
	
	return {
		onSceneActive: onSceneActive,
		backgrounds: backgrounds
	}
}
