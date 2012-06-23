/**
 *	@author Bloody
 */
var Game_TestObject = new Class({
	Extends: Scene_Node_Drawable,
	
	
	
	initialize : function() {
		
	},
	
	draw: function(sceneGraph) {
		
		this.x += (Math.random()*10) - 5;
		this.y += (Math.random()*10) - 5;
		
		this.parent(sceneGraph);
	},

});