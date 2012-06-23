/**
 *	@author Bloody
 */
var Scene_Node_Drawable = new Class({
	Extends: Scene_BaseNode,
	
	sprite: null,
	
	
	initialize : function() {
		
	},
	
	getSprite: function() {
		return this.sprite;
	},
	
	draw: function(sceneGraph) {
		
		sceneGraph.batch(this);
		
		this.parent(sceneGraph);
	},

});