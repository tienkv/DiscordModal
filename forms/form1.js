const {ModalBuilder,TextInputBuilder, TextInputStyle ,EmbedBuilder} = require('discord.js');

module.exports.customModal = function(){
	const modal = new ModalBuilder()
			.setCustomId('guildApplication')
			.setTitle('Guild Application');

		// Add components to modal
//question 1
		// Create the text input components
		const ign = new TextInputBuilder()
			.setCustomId('ign')
		    // The label is the prompt the user sees for this input
			.setLabel("What is your IGN?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
//question 2
		const rank = new TextInputBuilder()
			.setCustomId('rank')
			.setLabel("What is your RTA/Arena Rank?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);
//question 3
		const isActive = new TextInputBuilder()
			.setCustomId('isActive')
			.setLabel("Can you be Active on Discord?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);
//question 4
		const self = new TextInputBuilder()
			.setCustomId('self')
			.setLabel("Are you interested in our monthly events?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);			
//question 5
		const guildType = new TextInputBuilder()
			.setCustomId('guildType')
			.setLabel("What type of Guild are you interested in?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);


		// An action row only holds one text input,
		// so you need one action row per text input.
		const question1 = new ActionRowBuilder().addComponents(ign);
		const question2 = new ActionRowBuilder().addComponents(rank);
		const question3 = new ActionRowBuilder().addComponents(isActive);
		const question4 = new ActionRowBuilder().addComponents(self);
		const question5 = new ActionRowBuilder().addComponents(guildType);


		// Add inputs to the modal
		modal.addComponents(question1, question2, question3, question4, question5);
		return modal;
		
};