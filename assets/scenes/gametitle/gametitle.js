function(sender, localization) {
	
	function onSceneActive() {
		setTimeout(function() {
			$('#' + sender + ' .logo').addClass('fade-in');
			$('#' + sender + ' .continue').addClass('fade-in');
			$('#' + sender + ' .rocket').addClass('animate');
		}, 100);
		
		$('#' + sender).on('click', function(event) {
			Lyria.SceneManager.show('startScene')
		});
	}
	
	
	
	return {
		onSceneActive: onSceneActive
	}
}
