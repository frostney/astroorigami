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

}); 