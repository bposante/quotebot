const Quotes = require("../main")[0].table;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const deleteQuote = (module.exports = {
    name: "deletequote",
    description: "deletes the quote with the given id",
    usage: "!deletequote 'id of quote to delete'",
    botAction: async (message, args) => {
      if (args[0] === 'help') {
          return message.reply(deleteQuote.usage)
      }
      const rowCount = await Quotes.destroy({where: {id: args[0]}})
      if (!rowCount) {
          return message.reply('id not found')
      }
      return message.reply('quote deleted')
    },
  });