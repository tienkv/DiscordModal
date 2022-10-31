const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gform')
		.setDescription('Show Application form for Guild'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('Guild')
				.setLabel('Proceed')
				.setStyle(ButtonStyle.Primary),
			);
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Guild Application')
			.setURL('https://discord.js.org')
			.setDescription(
				"Hey Epic 7 Guild members, this is a submit request form for you guys to be able to follow. Do not submit or try to apply for our Guild if you do not think you are committed enough for a Guild.\n\n"+
				"Before clicking on create please read #epic-7-board and make sure you meet all the prerequisite before applying for SG Academy\n"
				);
		return interaction.reply({content: `Hello ${interaction.user.username}\n`, embeds: [embed], components: [row]});
	},
};