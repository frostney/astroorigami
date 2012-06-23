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
	
	load: function(src, callback) {
		this.src = src;
		
		var image = new Image();
		
		var self = this;
		
		image.onload = function() {
			
			self.image = image;
			self.width = image.width;
			self.height = image.height;
			
			callback(self);
		};
		
		image.src = '/assets/'+src;
	},

});