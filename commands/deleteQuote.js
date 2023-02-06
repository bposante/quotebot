const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("deletequote")
		.setDescription("deletes a quote with the specified id")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("id of the quote to delete")
        .setRequired(true)
		),
	async execute(interaction) {
		const Quotes = require("../main")[0].table;
		const quoteId = interaction.options.getString("id");
		const rowCount = await Quotes.destroy({ where: { id: `${quoteId}` } });
		if (!rowCount) {
			await interaction.reply({
				content: "id not found",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "quote deleted",
				ephemeral: true,
			});
		}
	},
};
