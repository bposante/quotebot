const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("howmanyquotes")
		.setDescription("replies with the current number of quotes"),
	async execute(interaction) {
		const Quotes = require("../main")[0].table;
		Quotes.count().then(async(count) => {
			await interaction.reply(`there are ${count} quotes so far`);
		})
	},
};
