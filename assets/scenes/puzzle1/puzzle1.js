function(sender, localization) {
	
	var backgroundName = 'background';
	var maxBackgrounds = 7;
	
	var backgrounds = [];
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push(Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image'));
	}
	
	
	var angle = 0;
	
	function update(dt) {
		angle += 0.33;
		if (angle == 360.0) {
			angle = 0;
		}
		
		$('.ferriswheel').rotate(angle);
	}
	
	return {
		backgrounds: backgrounds,
		update: update
	}
}
