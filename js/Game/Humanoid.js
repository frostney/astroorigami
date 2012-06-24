/**
 *	@author Bloody
 */
var Game_Humanoid = new Class({
	Extends: Scene_Node_Drawable,
	
	mode: 'idle_right',
	
	frame: 0,
	animation: 0,
	
	initialize : function(sprite) {
		this.sprite = sprite;
	},
	
	render: function(context) {
		this.sprite.render(context, this.position.x, this.position.y, this.animation, this.frame);
	},
	
	update_idle_right: function(sceneGraph) {
		this.animation = 2;
		this.frame = 0;
	},
	
	update_idle_left: function(sceneGraph) {
		this.animation = 2;
		this.frame = 1;
	},
	
	update_move_left: function(sceneGraph) {
		this.animation = 0;
		this.frame++;
		if(this.frame > this.sprite.frames - 1) {
			this.frame = 0;
		}
	},
	
	update_move_right: function(sceneGraph) {
		this.animation = 1;
		this.frame++;
		if(this.frame > this.sprite.frames - 1) {
			this.frame = 0;
		}
	},
	
	update: function(sceneGraph) {
		this['update_'+this.mode](sceneGraph);
		this.parent(sceneGraph);
	},

});