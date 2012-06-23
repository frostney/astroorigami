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

	render: function(context) {
		this.sprite.render(context, this.position.x, this.position.y);
	},
	
	draw: function(sceneGraph) {
		
		sceneGraph.batch(this);
		
		this.parent(sceneGraph);
	},

});