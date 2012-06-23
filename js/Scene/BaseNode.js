/**
 *	@author Bloody
 */
var Scene_BaseNode = new Class({

	x: 0,
	y: 0,
	z: 0,
	
	children: {},
	disposeMe: false,
	
	add: function(child) {
		
	},
	
	remove: function(child) {
		
	},
	
	dispose: function() {
		this.disposeMe = true;
	},
	
	update: function(sceneGraph) {
		for(var i in this.children) {
			this.children[i].update(sceneGraph);
		}
	},
	
	draw: function(sceneGraph) {
		for(var i in this.children) {
			this.children[i].draw(sceneGraph);
		}
	},

});