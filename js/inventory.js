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
};


astro.inventory.itemCatalogue = {
	'stone' : {
		'name' : 'Stones',
		'use' : {
			'tree' : function() {
				alert('cutting down tree')
			},
			'wood' : function() {
				astro.inventory.removeItem('stone');
				astro.inventory.removeItem('wood');
				alert('Created map')
				astro.inventory.addItem ('map');
			},
			'npc' : function() {
				alert('cant kill an innocent')
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'wood' : {
		'name' : 'Wood',
		'use' : {
			'tree' : function() {
				alert('cutting down tree')
			},
			'stone' : function() {
				// execut function in shield
				astro.inventory.content['stone'].use['wood']();
			},
			'npc' : function() {
				alert('cant kill an innocent')
			},
			'noUse' : function() {
				alert('cant use')
			}
		}
	},
	'map' : {
		'name' : 'Map',
		'use' : {
			'tree' : function() {
				alert('cutting down tree')
			},
			'npc' : function() {
				alert('cant map an innocent')
			},
			'noUse' : function() {
				alert('cant use it here')
			}
		}
	}
};
