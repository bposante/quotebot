const {SlashCommandBuilder} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("returns a random quote"),
  async execute(interaction) {

    const Quotes = require("../main")[0].table;
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize("database", "user", "password", {
      host: "localhost",
      dialect: "sqlite",
      logging: false,
      storage: "database.sqlite",
    });

    let quote = await Quotes.findOne({ order: sequelize.random()})
    if (quote) {
      await interaction.reply(`${quote.get("quote")} - ${quote.get("author")}`)
    } else {
      await interaction.reply('no quotes :(')
    }
  }
}