const Quotes = require("../main")[0].table;

const howManyQuotes = (module.exports = {
  name: "howmanyquotes",
  description: "replies with the number of quotes",
  botAction: (message, args) => {
    Quotes.count().then((count) => {
      message.reply(`there are ${count} quotes so far`);
    });
  },
});
