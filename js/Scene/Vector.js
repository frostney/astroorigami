/**
 *	@author Bloody
 */
var Scene_Vector = new Class({
	
	x: 0,
	y: 0,
	
	initialize : function(x, y) {
		this.x = x;
		this.y = y;
	},
	
	add: function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	},
	
	subtract: function(vector) {
		
	},
	
	normalize: function() {
		var length = this.getLength();
		this.x /= length;
		this.y /= length;
		return this;
	},
	
	getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	
	distance: function(vector) {
		var x = this.x - vector.x;
		var y = this.y - vector.y;
		
		return Math.sqrt(x * x + y * y);
	},

});