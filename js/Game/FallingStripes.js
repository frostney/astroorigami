/**
 *	@author Bloody
 */
var Game_FallingStripes = new Class({
	Extends: Scene_Node_Drawable,
	
	resetPosition: new Scene_Vector(0,0),
	
	initialize : function(sprite) {
		this.sprite = sprite;
		

		this.position.x = 200;
		this.position.y = 500;
		
		this.position.x += Math.random()*200 - 100;
		this.position.y += Math.random()*400 - 200;
		
		this.resetPosition.x = this.position.x;
		this.resetPosition.y = this.position.y;
		
	},
	
	update: function(sceneGraph) {
		this.parent(sceneGraph);
		
		var t = Math.random();
		
		this.position.x += sceneGraph.timeDelta * .5 * t;
		this.position.y -= sceneGraph.timeDelta * .5 * t;
		
		if(this.position.x > 800 || this.position.y < 0) {
			this.position.x = this.resetPosition.x;
			this.position.y = this.resetPosition.y;
		}
	},

});