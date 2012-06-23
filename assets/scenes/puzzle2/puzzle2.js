function(sender, localization) {
	
	console.log(sender);
	
	var backgroundName = 'background';
	var maxBackgrounds = 9;
	
	var backgrounds = [];
	
	//console.log(Lyria.Resource.name(sender + '/' + 'background', 'image'));
	
	//background.push();
	
	//Lyria.Assets.
	
	for (var i = 0; i < maxBackgrounds; i++) {
		backgrounds.push({
			filename: Lyria.Resource.name([sender, backgroundName + i + '.png'].join('/'), 'image')
		});
	}
	
	var angle = 0;
	
	function update(dt) {
		angle++;
		if (angle == 360) {
			angle = 0;
		}
		
		$('.pinwheel').rotate(angle);
	}
	
	return {
		backgrounds: backgrounds,
		update: update
	}
}
