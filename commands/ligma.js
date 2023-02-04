module.exports = {
    name: "ligma",
    description: "ligma",
    botAction: (message, args) => {
      const list = ["ligma balls", "who's steve jobs?"]
      message.reply(list[Math.floor(Math.random() * list.length)]);
    },
  };
  