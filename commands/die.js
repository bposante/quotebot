const Killed = require("../main")[1].table;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});


const die = (module.exports = {
    name: "die",
    description: "mercs a bitch",
    usage: "!die 'user to kill'",
    botAction: async (message, args) => {
        if (args[0] === 'help') {
            return message.reply(die.usage)
          }
          try {
            const killedUser = await Killed.create({
              user: args[0],
              count: 1,
            });
            return message.reply(`${killedUser.user} has been killed ${killedUser.count} times`);
          } catch (error) {
            if (error.name === "SequelizeValidationError") {
              return message.reply(`pls provide a user to kill: ${die.usage}`)
            }
            if (error.name === "SequelizeUniqueConstraintError") {
              let row = await Killed.findOne({where: {user: args[0]}});
              if (row) {
                row.increment("count");
                return message.reply(`${row.get("user")} has been killed ${row.get("count") + 1} times`);
              }
            }
            else {
              console.log("die ->", error)
            }
          }
    },
  });