var astro = astro || {};
astro.dialog = astro.dialog || {};

astro.dialog.currentDialog = {};
astro.dialog.currentNpc = 'strongGuy';

astro.dialog.startDialog = function(npcId) {
	if (astro.npc.content[npcId]) {
		var state = astro.npc.content[npcId].state;
		if (astro.dialog.content[npcId][state]) {
			var textObj = Lyria.Utils.cloneObject(astro.dialog.content[npcId][state]);
			astro.dialog.currentDialog = textObj;
			astro.dialog.currentNpc = npcId;
			astro.dialog.turnPage();
		} else {
			alert('no dialog for npc ' + npcId + ' and state ' + state);
		}
	} else {
		console.log('cant find npc');
	}
};

astro.dialog.turnPage = function() {
	if (!$.isEmptyObject(astro.dialog.currentDialog)) {
		var buttonElem = $('.dialog .button');
		var nameElem = $('.dialog .name');
		var textElem = $('.dialog .text');
		var textObj = astro.dialog.currentDialog;
		var page = buttonElem.attr('page');
		page = (isNaN(page) || !page) ? 0 : (parseInt(page) + 1);
		// check if this page exists if true, then show data of this page
		if (textObj.texts[page]) {
			buttonElem.attr('page', page);
			nameElem.html(astro.npc.content[astro.dialog.currentNpc].name);
			textElem.css('color', astro.npc.content[astro.dialog.currentNpc].textColor);
			textElem.html(textObj.texts[page].npc || '');
			buttonElem.html(textObj.texts[page].player || 'Bye');
			$('.dialog').removeClass('hidden');
		} else {

			// if there are no more pages, close dialog and set npc to postcondition
			$('.dialog').addClass('hidden');
			buttonElem.attr('page', '');
			astro.npc.content[astro.dialog.currentNpc].state = textObj.postcondition;
			astro.dialog.currentDialog = {};

			// trigger event that conversation ended
			$('body').trigger('talkedToSO');
		}
	} else {
		// trigger talk button to get npcId for conversation
		$('#talk .button').trigger('click');
	}
};

astro.dialog.content = {
	'strongGuy' : {
		0 : {
			'precondition' : 0,
			'postcondition' : 1,
			'texts' : [{
					npc : 'Are you talking to me, white suit?',
					player : 'Yes, Sir.'
				},{
					npc : 'I\'m sorry, I can\'t talk to you. I\'m busy being the strongest guy around.',
					player : 'If you\'re so strong, maybe you can help me rebuild my rocket?'
				}, {
					npc : 'I don\'t think so.',
					player : 'All I\'d need is your fancy party hat.'
	
				}, {    npc : 'What for?',
					player : 'It\'d work perfectly as a body for my rocket.'
	
				}, {	npc : 'You know, I\'m not only the strongest but also the coolest guy around.',
					player : 'I\'ve noticed.'
	
				}, {	npc : 'If I\'m giving away my hat, my integrity is destroyed. That\'s a problem.',
					player : 'Well, I totally understand. Although I think your plain hair is pretty cool as well.',
	
				}, {	npc : 'It is, isn\'t it? I\'m strong, beautiful and own the best hat ever.',
					player : 'I can see your simplistic beauty, and your hat is quite contemporary. But can you prove that your muscles are actually bigger than your mouth?',
	
				}, {	npc : 'You\'re a chump if you won\'t believe my skill. Watch me.'
				}
			]
		},
		1 : {
			'postcondition' : 1,
			'texts' : [{
				npc : 'I\'m not talking to you anymore, fool.'
			}]
		}
	},
	'tallGuy' : {
		0 : {
			'precondition' : 0,
			'postcondition' : 1,
			'texts' : [{
				npc : 'Uhhh...sneef...uhh.',
				player : 'Why do you cry?'
			}, {
				npc : 'I lost my pillow. So I can’t sleep.',
				player : 'I will find your pillow.'
			}]
		},
		2 : {
			'precondition' : 1,
			'postcondition' : 3,
			'texts' : [{
				npc : 'I still cannot sleep! I am hungry!',
				player : 'Maybe you should gather some cherries from the tree.'
			}]
		},
		4 : {
			'precondition' : 3,
			'postcondition' : 5,
			'texts' : [{
				npc : 'Now I am thirsty. Can’t you give me some water? With some water I finally could… sleep.',
				player : 'I will bring you some water.'
			}]
		},
		7 : {
			'precondition' : 6,
			'postcondition' : 8,
			'texts' : [{
				npc : 'Now I am very… sleepy.',
				player : 'Good night tall guy.'
			}]
		}

	},
	'smallGuy' : {
		0 : {
			'precondition' : 0,
			'postcondition' : 1,
			'texts' : [{
				npc : '<i>…argh…!</i>',
				player : '???'
			}]
		},
		3 : {
			'precondition' : 1,
			'postcondition' : 4,
			'texts' : [{
				npc : 'You… you saved my life. You are my servant now. I will serve you for the rest of my life!',
				player : 'Ähmm… thank you. But I only have one request. I need a ticket back to earth.'
			}, {
				npc : 'A ticket to earth? I think the meerkats down the hole do have one. They often tried to sell it to me. But I do have no money… and no… spaceship.',
				player : 'I have a spaceship.'
			}, {
				npc : 'Please take me with you. Please!',
				player : 'I do not have a ticket.'
			}, {
				npc : 'The meerkats down the hole have a ticket. But the hole is very deep. I can’t get down.',
				player : 'I will find a way to bring you down the hole.'
			}]
		}
	}
}; 