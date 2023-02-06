const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("die")
		.setDescription("mercs a cursed user")
		.addStringOption((option) =>
			option
				.setName("user")
				.setDescription("the user to eliminate")
				.setRequired(true)
		),
	async execute(interaction) {
		const Killed = require("../main")[1].table;
		const target = interaction.options.getString("user");
		if (!target) {
			await interaction.reply("must provide a user");
		}

		try {
			await Killed.create({
				user: target,
				count: 1,
			});
			await interaction.reply(
				`${target} has been killed for the first time!`
			);
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				console.log(error);
				await interaction.reply("there was an error :(");
			} else if (error.name === "SequelizeUniqueConstraintError") {
				const row = await Killed.findOne({ where: { user: target } });
				if (row) {
					row.increment("count");
					await interaction.reply(
						`${target} has been killed ${
							row.get("count") + 1
						} times!`
					);
				}
			} else {
				console.log(error);
			}
		}
	},
};
