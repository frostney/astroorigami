/**
 *	@author Bloody
 */
var Game_Firefly = new Class({
	Extends: Scene_Node_Drawable,
	
	frameTimeElapsed: 0,
	frame: 0,
	
	position: new Scene_Vector(250, 150),
	vector: new Scene_Vector(0, 0),
	direction: null,
	center: new Scene_Vector(250, 150),
	maxDistance: 100,
	power: .008,
	momentum: new Scene_Vector(0, 0),
	
	initialize : function(animation) {
		this.sprite = animation;
		this.position.x += 30*Math.random() - 15;
		this.position.y += 30*Math.random() - 15;
		this.direction = new Scene_Vector((Math.random()*10 - 5) * 3, Math.random()*10 - 5).normalize();
	},
	
	render: function(context) {
		this.sprite.render(context, this.position.x, this.position.y, 0, this.frame);
	},
	
	update: function(sceneGraph) {
		var delta = sceneGraph.timeDelta;
		this.frameTimeElapsed += delta;
		

		if(this.position.distance(this.center) > this.maxDistance) {
			this.direction = new Scene_Vector(this.center.x - this.position.x, this.center.y - this.position.y).normalize();
		}else{
			this.direction = new Scene_Vector((Math.random()*10 - 5) * 3, Math.random()*10 - 5).normalize();
		}
		this.momentum.x += this.direction.x * this.power;
		this.momentum.y += this.direction.y * this.power;
		
		if(this.frameTimeElapsed > 250) {
			this.frameTimeElapsed -= 250;
			this.frame++;
			if(this.frame >= this.sprite.frames) {
				this.frame = this.frame%this.sprite.frames;
			}
		}
		
		this.position.x += this.momentum.x * delta;
		this.position.y += this.momentum.y * delta;
		
		this.momentum.x *= 0.9;
		this.momentum.y *= 0.9;
		
		this.parent(sceneGraph);
	},
	
	draw: function(sceneGraph) {
		this.parent(sceneGraph);
	},

});