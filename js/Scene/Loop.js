/**
 *	@author Bloody
 */
var Scene_Loop = new Class({
	
	tasks: {},
	
	lastFrame: 0,
	currentFrame: 0,
	
	initialize : function() {
		
	},
	
	addTask: function(callback, time) {
		var t = {
			callback: callback,
			time: time,
			timeElapsed: 0,
		};
		
		setID(t);
		
		this.tasks[t.$id] = t;
	},
	
	start: function() {
		this.lastFrame = new Date() - 0;
		this.execute(new Date() - 0);
	},
	
	execute: function(time) {
		this.lastFrame = this.currentFrame;
		this.currentFrame = time;
		var delta = this.currentFrame - this.lastFrame;
		
		for(var i in this.tasks) {
			var t = this.tasks[i];
			
			t.timeElapsed += delta;
			if(t.timeElapsed > t.time) {
				t.callback(this);
				t.timeElapsed -= t.time;
			}
		}
		
		var self = this;
	    
	    requestAnimFrame(function() {
	    	self.execute(new Date() - 0);
	    });
	},

});