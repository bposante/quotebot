const {SlashCommandBuilder} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName('getallquotes')
    .setDescription('logs all the saved quotes'),
  async execute(interaction) {
    const Quotes = require("../main")[0].table;
    const quoteList = await Quotes.findAll({attributes: ['id', 'quote'], order: [['id', 'ASC']]})
    for (let i = 0; i < quoteList.length; i++) {
      console.log(`${quoteList[i].id}: ${quoteList[i].quote}`)
    }

    await interaction.reply(`quotes logged`);
  }
}