const {SlashCommandBuilder} = require("discord.js");

  
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ligma")
    .setDescription("LIGMA"),
  async execute(interaction) {
    const list = ["ligma balls", "who's steve jobs?"]
    await interaction.reply(list[Math.floor(Math.random() * list.length)]);
  }
}