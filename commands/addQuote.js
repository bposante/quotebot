const addQuote = (module.exports = {
  name: "addquote",
  description: "adds a quote to the blackmail database",
  usage: "!addquote 'quote to be added' 'person that said quote'",
  botAction: async (message, args) => {
    if (args[0] === 'help') {
      return message.reply(addQuote.usage)
    }
    const Quotes = require("../main")[0].table;
    const quoteName = args.slice(0, args.length - 1).join(" ");
    const date = new Date().toLocaleDateString();
    try {
      const quote = await Quotes.create({
        quote: quoteName,
        author: args[args.length - 1],
        date: date,
      });
      console.log("quote added at", date);
      console.log(quote.quote, "by ->", quote.author);
      return message.reply(`quote added`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return message.reply("that quote already exists");
      }
      console.log("addquote -> ", error);
      return message.reply("something went wrong. check out the command usage:", quote.usage);
    }
  },
});
