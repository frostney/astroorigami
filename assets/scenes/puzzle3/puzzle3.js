function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 6;
	
	var backgrounds = [];
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push(Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image'));

	}
	
	function onSceneActive() {
		// set character into the beginning of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 280, left : scenePos.left + 10});
		
		// check if sth was picked up and if player has everything for this scene give him the possibility to go to the next scene
		$('body').off('sthWasPickedUp');
		$('body').on('sthWasPickedUp', function() {
			console.log('sth picked up')
			// check if player has needed items in inventory
			if (astro.inventory.content['ticket']) {
				console.log('showSceneChange')
				$('#puzzle3 .interactableNpc[rel=sceneChange]').removeClass('hidden');
			}
		});
	}
	
	return {
		onSceneActive: onSceneActive,
		backgrounds: backgrounds
	}
}
