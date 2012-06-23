/**
 *	@author Bloody
 */
var Scene_Asset_Sprite = new Class({
	
	image: null,
	src: null,
	
	width: 0,
	height: 0,
	
	loaded: false,
	
	initialize : function() {
		
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