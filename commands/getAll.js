const Quotes = require("../main")[0].table;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const getAll = (module.exports = {
    name: "getall",
    description: "prints all the current quotes",
    usage: "!getall",
    botAction: async (message, args) => {
      if (args[0] === 'help') {
          return message.reply(getAll.usage)
      }
      const quoteList = await Quotes.findAll({attributes: ['id', 'quote']})
      for (let i = 0; i < quoteList.length; i++) {
          console.log(`${quoteList[i].id}: ${quoteList[i].quote}`)
      }
    },
  });