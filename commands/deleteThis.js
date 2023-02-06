const {SlashCommandBuilder} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletethis")
    .setDescription("deleto blue"),
  async execute(interaction) {
    await interaction.reply("https://www.youtube.com/watch?v=NHaJ34f2QLg")
  }
}
