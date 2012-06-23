/**
 *	@author Bloody
 */
var Game_Humanoid = new Class({
	Extends: Scene_Node_Drawable,
	
	mode: 'idle',
	
	frame: 0,
	animation: 0,
	
	initialize : function(sprite) {
		this.sprite = sprite;
	},
	
	render: function(context) {
		this.sprite.render(context, this.position.x, this.position.y, this.animation, this.frame);
	},
	
	update_idle: function(sceneGraph) {
		
	},
	
	update_walk: function(sceneGraph) {
		
	},
	
	update: function(sceneGraph) {
		this['update_'+this.mode](sceneGraph);
		this.parent(sceneGraph);
	},

});