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
		var textElem = $('.dialog .text');
		var textObj = astro.dialog.currentDialog;
		var page = buttonElem.attr('page');
		page = isNaN(page) ? 0 : (parseInt(page) + 1);
		// check if this page exists if true, then show data of this page
		if (textObj.texts[page]) {
			buttonElem.attr('page', page);
			textElem.css('color', astro.npc.content[astro.dialog.currentNpc].textColor);
			textElem.html(textObj.texts[page].npc);
			buttonElem.html(textObj.texts[page].player);
			$('.dialog').removeClass('hidden');
		} else {

			// if there are no more pages, close dialog and set npc to postcondition
			$('.dialog').addClass('hidden');
			buttonElem.attr('page', 0);
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
			'postcondition' : 2,
			'texts' : [{
				npc : 'You got an interesting hat.',
				player : 'It’s the biggest hat on this planet!'
			}, {
				npc : 'I could use your hat to rebuild my spaceship.',
				player : 'The strongest man needs the biggest hat. It’s my hat. I would never give it to someone like… you!'
			}, {
				npc : 'Could you please show me how strong you are?',
				player : 'I am the record holder on the high striker. One hit should be enough for an impression of my strength.'
			}]
		}
	},
	'tallGuy' : {
		0 : {
			'precondition' : 0,
			'postcondition' : 1,
			'texts' : [{
				npc : 'Why do you cry?',
				player : 'I can’t sleep.'
			}, {
				npc : 'Why can’t you sleep?',
				player : 'I lost my pillow.'
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