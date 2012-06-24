function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 7;
	
	var backgrounds = [];
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push(Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image'));
	}
	
	return {
		backgrounds: backgrounds
	}
}
