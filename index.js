const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, ActionRowBuilder, ModalBuilder,TextInputBuilder, TextInputStyle ,EmbedBuilder, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'command');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

function customModal1(){
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

function customModal2(){
	const modal = new ModalBuilder()
			.setCustomId('artistApplication')
			.setTitle('Artist Application');

		// Add components to modal
//question 1
		// Create the text input components
		const budget = new TextInputBuilder()
			.setCustomId('budget')
		    // The label is the prompt the user sees for this input
			.setLabel("Budget")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
//question 2
		const sfw = new TextInputBuilder()
			.setCustomId('sfw')
			.setLabel("SFW/NSFW")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);
//question 3
		const payment = new TextInputBuilder()
			.setCustomId('payment')
			.setLabel("Payment Method")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);
//question 4
		const personal = new TextInputBuilder()
			.setCustomId('personal')
			.setLabel("Personal/Commercial Use")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);			
//question 5
		const content = new TextInputBuilder()
			.setCustomId('content')
			.setLabel("Content")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);


		// An action row only holds one text input,
		// so you need one action row per text input.
		const question1 = new ActionRowBuilder().addComponents(budget);
		const question2 = new ActionRowBuilder().addComponents(sfw);
		const question3 = new ActionRowBuilder().addComponents(payment);
		const question4 = new ActionRowBuilder().addComponents(personal);
		const question5 = new ActionRowBuilder().addComponents(content);


		// Add inputs to the modal
		modal.addComponents(question1, question2, question3, question4, question5);
		return modal;
		
};



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return;

	if(interaction.isChatInputCommand()){
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		try {
			console.log(command.data.name);
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}else if(interaction.isButton()){
		// Show the modal to the user
		console.log(interaction.customId);
		cModal = customModal1();

		if(interaction.customId == "Artist"){
			cModal = customModal2();
		}
		await interaction.showModal(cModal);
	}else if(interaction.isModalSubmit()){
		console.log(interaction.customId);
		var embed = null;
		if(interaction.customId == "artistApplication"){
			const budget = interaction.fields.getTextInputValue('budget');
			const sfw = interaction.fields.getTextInputValue('sfw');
			const payment = interaction.fields.getTextInputValue('payment');
			const personal = interaction.fields.getTextInputValue('personal');
			const content = interaction.fields.getTextInputValue('content');
			embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(`Form submitted by: ${interaction.user.username}`)
				.setURL('https://discord.js.org')
				.setDescription(`1. Budget: ${budget} \n
				2. SFW/NSFW: ${sfw}\n
				3. Payment: ${payment}\n
				4. Personal/Commercial use: ${personal}\n
				5. Content: ${content}`);

		}else{
			const ign = interaction.fields.getTextInputValue('ign');
			const rank = interaction.fields.getTextInputValue('rank');
			const isActive = interaction.fields.getTextInputValue('isActive');
			const self = interaction.fields.getTextInputValue('self');
			const guildType = interaction.fields.getTextInputValue('guildType');
			embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(`Form submitted by: ${interaction.user.username}`)
				.setURL('https://discord.js.org')
				.setDescription(`1. What is your IGN?: ${ign} \n
				2. What is your RTA/Arena Rank?: ${rank}\n
				3. Can you be Active on Discord?: ${isActive}\n
				4. Are you interested in our monthly events?: ${self}\n
				5. What type of Guild are you personally interested in?: ${guildType}`);
		}
		
		interaction.guild.channels.cache.get('1029609076918853652').send({content:`` , embeds: [embed]});
		interaction.reply(`Info: ${interaction.user.username} has submitted the form`);
	}
	
});

// client.on('messageCreate', async message =>{
// 	console.log(message.author.username);
// });

client.login(token);