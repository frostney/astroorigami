/**
 *	@author Bloody
 */
var Game_TestObject = new Class({
	Extends: Scene_Node_Drawable,
	
	frame: 0,
	
	initialize : function() {
		
	},
	
	render: function(context) {
		this.sprite.render(context, this.x, this.y, 0, this.frame);
	},
	
	draw: function(sceneGraph) {
		
		
		this.frame++;
		
		if(this.frame > 4) {
			this.frame = 0;
		}
			
		
		this.x += (Math.random()*10) - 5;
		this.y += (Math.random()*10) - 5;
		
		this.parent(sceneGraph);
	},

});