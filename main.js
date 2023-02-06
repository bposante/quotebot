const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite",
});

module.exports = [
	{
		table: (Quotes = sequelize.define("quotes", {
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			quote: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			author: {
				type: Sequelize.STRING,
			},
			date: {
				type: Sequelize.DATE,
			},
		})),
	},
	{
		table: (Killed = sequelize.define("killed", {
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			user: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			count: {
				type: Sequelize.INTEGER,
			},
		})),
	},
];

client.commands = new Collection();

// load commands from ./commands folder
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] the command at ${filePath} is missing a required property`
		);
	}
}

client.once(Events.ClientReady, (c) => {
	console.log(`logged in as ${c.user.tag}!`);
	Quotes.sync();
	Killed.sync();
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`no command matching ${interaction.commandName} was found`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'there was an error :(', ephemeral: true})
	}
})

client.login(token);
