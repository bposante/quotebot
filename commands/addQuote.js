const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addquote")
		.setDescription("adds a quote to the blackmail database")
		.addStringOption((option) =>
			option
				.setName("quote")
				.setDescription("the quote you want to add")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("author")
				.setDescription("who said the quote")
				.setRequired(true)
		),
	async execute(interaction) {
		const Quotes = require("../main")[0].table;
		const date = new Date().toLocaleDateString();
		const quote = interaction.options.getString("quote");
		const author = interaction.options.getString("author");
		try {
			const row = await Quotes.create({
				quote: quote,
				author: author,
				date: date,
			});
			console.log(date);
			console.log(`${row.id}. ${quote} - ${author}`);
			await interaction.reply("quote added!");
		} catch (error) {
			if (error.name === "SequelizeUniqueConstraintError") {
				await interaction.reply("that quote already exists");
			} else {
				console.log(`add quote -> ${error}`);
				await interaction.reply("something went wrong :(");
			}
		}
	},
};
