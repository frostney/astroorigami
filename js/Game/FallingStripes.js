/**
 *	@author Bloody
 */
var Game_FallingStripes = new Class({
	Extends: Scene_Node_Drawable,
	
	
	initialize : function(sprite) {
		this.sprite = sprite;
	},
	
	update: function(sceneGraph) {
		this.parent(sceneGraph);
	},

});