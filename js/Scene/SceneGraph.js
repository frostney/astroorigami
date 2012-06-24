/**
 *	@author Bloody
 */
var Scene_SceneGraph = new Class({
	
	lastUpdate: 0,
	currentTime: 0,
	timeDelta: 0,
	
	children: {},
	
	
	currentBatch: [],
	
	initialize : function() {
		
	},
	
	add: function(element) {
		setID(element);
		this.children[element.$id] = element;
	},
	
	remove: function(element) {
		delete this.children[element.$id];
	},
	
	update: function(loop) {
		
		var gameTime = loop.currentFrame;
		
		this.lastUpdate = this.currentTime;
		this.currentTime = gameTime;
		this.timeDelta = this.currentTime - this.lastUpdate;
		
		for(var i in this.children) {
			this.children[i].update(this);
		}
		
		
	},
	
	batch: function(item) {
		this.currentBatch.push(item);
	},
	
	draw: function(gameTime) {
		
		this.currentBatch = [];
		
		for(var i in this.children) {
			this.children[i].draw(this);
		}
		
		return this.currentBatch;
	},
	
	clear: function() {
		this.children = {};
	},

});