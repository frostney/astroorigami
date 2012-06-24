/**
 *	@author Bloody
 */
var Game_CrashingShip = new Class({
	Extends: Scene_Node_Drawable,
	
	mode: null,
	
	initialize : function(sprite) {
		this.sprite = sprite;
		
		this.event_start();
	},
	
	event_start: function() {
		this.position.x = 800;
		this.position.y = - this.sprite.height + 50;
		this.mode = 'start';
	},
	
	update_start: function(sceneGraph) {
		
		if(this.position.y < 100) {
			this.position.x -= sceneGraph.timeDelta * .05 + (Math.random()*10 - 5);
			this.position.y += sceneGraph.timeDelta * .05;
		}else{
			this.event_wait();
		}
	},
	
	event_wait: function() {
		this.mode = 'wait';
		var self = this;
		
		window.setTimeout(function() {
			self.event_leave();
		}, 5000);
	},
	
	update_wait: function(sceneGraph) {
		
			this.position.x -= Math.random()*6 - 3;
			this.position.y += Math.random()*6 - 3;
	},
	
	event_leave: function() {
		this.mode = 'leave';
	},
	
	update_leave: function(sceneGraph) {
		
		this.position.x -= sceneGraph.timeDelta * .05 + (Math.random()*10 - 5);
		this.position.y += sceneGraph.timeDelta * .05;
	},
	
	
	update: function(sceneGraph) {
		if(typeof this['update_'+this.mode] === 'function') {
			this['update_'+this.mode](sceneGraph);
		}
		this.parent(sceneGraph);
	},

});