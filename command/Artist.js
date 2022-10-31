const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aform')
		.setDescription('Show Artist Application Form'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('Artist')
				.setLabel('Proceed')
				.setStyle(ButtonStyle.Primary),
			);
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Artist Application')
			.setURL('https://discord.js.org')
			.setDescription(
				"Remember to make sure that you read  #sga-rules-and-info and #art-info-and-roles before you submit your request. The cooldown before you can submit or resubmit is 5 days.\n\n "+
				"There will be a format for you to follow upon clicking PROCEED make sure to only post links in content tab. \n\n\n" +
				"This is still the testing phase for us, if you have not been notified of your form being approved or canceled within 2 days please DM us and let us know. If you have any issues or concerns please let us know \n\n" +
				"This is a format that we created to ensure that both parties feel safe and comfortable. Those who are able to post here are essentially certified in our community as a safe background prerequisite. Just make sure you always take caution for yourself anyway and negotiate properly with your clients the rest is up to you. \n\n\n" +
				"This will be the embed description before anybody clicks create \n\n"
				);
		return interaction.reply({content: `Hello ${interaction.user.username}\n`, embeds: [embed], components: [row]});
	},
};