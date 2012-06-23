/**
 *	@author Bloody
 */
var Scene_Asset_Animation = new Class({
	
	image: null,
	src: null,
	
	width: 0,
	height: 0,
	
	loaded: false,
	
	animations: 0,
	frames: 0,
	
	initialize : function(animations, frames) {
		this.animations = animations;
		this.frames = frames;
	},
	
	render: function(context, x, y, animation, frame) {
		
		var w = this.width;
		var h = this.height;
		
		context.drawImage(this.image, frame * w, animation * h, w, h, x, y, w, h);
	},
	
	load: function(src, callback) {
		this.src = src;
		
		var image = new Image();
		
		var self = this;
		
		image.onload = function() {
			
			self.image = image;
			self.width = image.width / self.frames;
			self.height = image.height / self.animations;
			
			callback(self);
		};
		
		image.src = src;
	},

});