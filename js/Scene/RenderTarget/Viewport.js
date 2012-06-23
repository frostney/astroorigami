/**
 *	@author Bloody
 */
var Scene_RenderTarget_Viewport = new Class({
	
	rootElement: null,
	
	canvas: null,
	context: null,
	
	sceneGraph: null,
	
	initialize : function(element, sceneGraph) {
		this.rootElement = element;
		this.sceneGraph = sceneGraph;
		
		var size = element.width();
		
		var canvas = $(document.createElement('canvas'));
		
		canvas.attr('width', element.width());
		canvas.attr('height', element.height());
		
		canvas.css('top', 0);
		
		canvas.addClass('viewport absolute');
		
		element.append(canvas);
		this.canvas = canvas;
		this.context = canvas[0].getContext('2d');
	},
	
	update: function() {
		var size = element.getSize();
		this.canvas.set('width', size.x).set('height', size.y);
	},
	
	render: function() {
		var batch = this.sceneGraph.draw();
		
		batch.sort(function(A, B) {
			return A.z - B.z;
		});
		
		this.context.clearRect(0, 0, this.canvas.attr('width'), this.canvas.attr('height'));
		
		for(var i = 0; i < batch.length; i++) {
			var item = batch[i];
			this.context.drawImage(item.getSprite().image, item.x, item.y);
		}
	},

});