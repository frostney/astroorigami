var astro = astro || {};
astro.inventory = astro.inventory || {};
astro.inventory.content = {};

astro.inventory.addItem = function (itemName) {
	if (astro.inventory.itemCatalogue[itemName]) {
		astro.inventory.content[itemName] = Lyria.Utils.cloneObject(astro.inventory.itemCatalogue[itemName]);
		astro.inventory.refreshInventory();
	} else {
		console.log('item not found');
	}
};

astro.inventory.removeItem = function (itemName) {
	delete astro.inventory.content[itemName];
	astro.inventory.refreshInventory();
};

astro.inventory.useItem = function (itemName, withWhat) {
	if (itemName != withWhat) {
		if (astro.inventory.content[itemName].use[withWhat]) {
			astro.inventory.content[itemName].use[withWhat]();
		} else {
			astro.inventory.content[itemName].use['noUse']();
		}
	} else {
		console.log('cant use item with itself');
	}
};

astro.inventory.refreshInventory = function () {
	var content = '';
	$.each(astro.inventory.content, function(index, elem) {
		content += '<div class="item" rel="'+index+'" title="'+elem.name+'"><div class="image"><img src="assets/images/icons/'+index+'.png" style="width: 100%; height:100%"/></div><div class="button useItem">Use</div></div>';		
	});
	$('.inventory').html(content);
	
		$('.inventory .item .image').draggable({ 
		opacity: 0.7,
		helper: 'clone',
		cancle: 'button',
		revert: 'invalid'
	});
	
	$(".inventory .item").droppable({
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop: function( event, ui ) {
			astro.inventory.useItem(ui.draggable.parent().attr('rel'), $(this).attr('rel'));
		}
	});
};

astro.inventory.itemCatalogue = {
	'pillow' : {
		'name' : 'Pillow',
		'use' : {
			'pillowStone' : function () {
				console.log('using pillow with pillowStone')
				//TODO change state of tallGuy so he accepts the sleeping area
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'rope' : {
		'name' : 'Rope',
		'use' : {
			'cactus' : function () {
				//TODO change state of cactus
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'scissors' : {
		'name' : 'Scissors',
		'use' : {
			'cactus' : function () {
				//TODO change state of cactus
			},
			'pinWheelTree' : function () {
				//TODO change state of pin wheel tree
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'cherries' : {
		'name' : 'Cherries',
		'use' : {
			'flowerPotWater' : function() {
				astro.inventory.removeItem('cherries');
				astro.inventory.addItem('flowerPotWater');
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'flowerPot' : {
		'name' : 'Flower Pot',
		'use' : {
			'water' : function () {
				astro.inventory.removeItem('flowerPot');
				astro.inventory.addItem('flowerPotWater');
			},
			'cactus' : function () {
				astro.inventory.removeItem('flowerPot');
				astro.inventory.addItem('flowerPotCactus');
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'flowerPotCactus' : {
		'name' : 'Flower Pot with Cactus Water',
		'use' : {
			'smallGuy' : function() {
				astro.inventory.removeItem('flowerPotCactus');
				// increase npc state
				astro.npc.content['smallGuy'].state++;
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'flowerPotWater' : {
		'name' : 'Flower Pot with Water ',
		'use' : {
			'cherries' : function() {
				astro.inventory.content['cherries'].use['flowerPotWater']();
			},
			'tallGuy' : function() {
				astro.inventory.removeItem('flowerPotWater');
				astro.inventory.addItem('flowerPot');
				// increase npc state
				astro.npc.content['tallGuy'].state++;
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'ticket' : {
		'name' : 'Ticket',
		'use' : {
			'rocket' : function() {
				astro.inventory.removeItem('ticket');
				// TODO increase state of rocket
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'partyHat' : {
		'name' : 'Party Hat',
		'use' : {
			'rocket' : function() {
				astro.inventory.removeItem('partyHat');
				// TODO increase state of rocket
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'pinWheel' : {
		'name' : 'Pin Wheel',
		'use' : {
			'rocket' : function() {
				astro.inventory.removeItem('pinWheel');
				// TODO increase state of rocket
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	}
};
