function(sender, localization) {
	
	function onSceneActive() {
		setTimeout(function() {
			$('#' + sender + ' #logo').addClass('fade-in');
			$('#' + sender + ' .continue').addClass('fade-in');
		}, 100);
		
		$('#' + sender).on('click', function(event) {
			Lyria.SceneManager.show('intro')
		});
	}
	
	
	
	return {
		onSceneActive: onSceneActive
	}
}
