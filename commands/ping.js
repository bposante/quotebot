const { SlashCommandBuilder } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("replies with pong!"),
	async execute(interaction) {
		const sent = await interaction.reply({content: "pinging...", fetchReply: true});
		interaction.editReply(`pong! ms: ${sent.createdTimestamp - interaction.createdTimestamp}`)
	},
};
