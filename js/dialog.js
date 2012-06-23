var astro = astro || {};
astro.dialog = astro.dialog || {};

astro.dialog.currentDialog = {};
astro.dialog.currentNpc = 'strongGuy';

astro.dialog.startDialog = function(npcId) {
	if (astro.npc.content[npcId]) {
		var state = astro.npc.content[npcId].state;
		if(astro.dialog.content[npcId][state]) {
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
		console.log(page);
		page = isNaN(page) ? 0 : (parseInt(page) + 1);
		console.log('page '+ page)
		// check if this page exists if true, then show data of this page
		if (textObj.texts[page]) {
			console.log('if')
			buttonElem.attr('page', page);
			textElem.css('color', astro.npc.content[astro.dialog.currentNpc].textColor);
			textElem.html(textObj.texts[page].npc);
			buttonElem.html(textObj.texts[page].player);
			$('.dialog').removeClass('hidden');
			console.log('end if');
		} else {
			console.log('post')
			// if there are no more pages, close dialog and set npc to postcondition
			$('.dialog').addClass('hidden');
			buttonElem.attr('page', 0);
			astro.npc.content[astro.dialog.currentNpc].state = textObj.postcondition;
			astro.dialog.currentDialog = {};
		}
	} else {
		console.log('else')
		// TODO get npcId from scene
		astro.dialog.startDialog('strongGuy');	
	}
};

astro.dialog.content = {
	'strongGuy' : {
		0 : {
			'precondition' : 0,
			'postcondition': 1,
			'texts' : [
				{
					npc : 'Hello <b>how</b> are you',
					player: 'Good and you'
				},
				{
					npc : '2',
					player: '3'
				}
			]
		}
	},
};