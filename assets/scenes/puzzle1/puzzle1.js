function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 7;
	
	var backgrounds = [];
	

	function onSceneActive() {
		// set character into the beginning of the scene
		var scenePos = $('#viewport').offset();
		$('.character:visible').offset({top : scenePos.top + 200, left : scenePos.left + 10});
		
		
		// check if sth was picked up and if player has everything for this scene give him the possibility to go to the next scene
		$('body').off('sthWasPickedUp');
		$('body').on('sthWasPickedUp', function() {
			console.log('sth picked up')
			// check if player has needed items in inventory
			if (astro.inventory.content['partyHat']) {
				$('#puzzle1 .interactableNpc[rel=sceneChange]').removeClass('hidden');
			}
		});
		
		// check if s.o. was talked to
		$('body').off('talkedToSO');
		$('body').on('talkedToSO', function() {
			
			// check if player has needed items in inventory
			if (astro.npc.content['strongGuy'].state == 1) {
				$('#puzzle1 .interactableElem[rel=partyHat]').removeClass('hidden');
			}
		});
	}

	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push(Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image'));

	}
	
	return {
		onSceneActive: onSceneActive,
		backgrounds: backgrounds
	}
}
