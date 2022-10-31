const { SlashCommandBuilder , TextChannel} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Testing'),
	async execute(interaction) {
		interaction.guild.channels.cache.get('1029609076918853652').send('hi');
		
		console.log(interaction.guild.members.list());// list the member just interact on chat
		interaction.guild.members.list().get('292870282270605312').send('Hi Colby Baloney');
		return interaction.reply(`Test Guild: \n`);
	},
};