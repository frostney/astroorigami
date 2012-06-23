/**
 *	@author Bloody
 */
var Game_Star = new Class({
	Extends: Scene_Node_Drawable,
	
	frameTimeElapsed: 0,
	frame: 0,
	
	initialize : function(animation) {
		this.sprite = animation;
		this.frame = Math.floor(animation.frames*Math.random());
	},
	
	render: function(context) {
		this.sprite.render(context, this.position.x, this.position.y, 0, this.frame);
	},
	
	update: function(sceneGraph) {
		var delta = sceneGraph.timeDelta;
		this.frameTimeElapsed += delta;
		
		if(this.frameTimeElapsed > 100) {
			this.frameTimeElapsed -= 100;
			if(this.frame == 0) {
				if(Math.random() > .9) {
					this.frame++;
				}
			}else{
				this.frame++;
				if(this.frame >= this.sprite.frames) {
					this.frame = this.frame%this.sprite.frames;
				}
			}
		}
		
		this.parent(sceneGraph);
	},

});