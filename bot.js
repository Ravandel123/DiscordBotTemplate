require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const discord = require('discord.js');
const fs = require('fs');

const client = new Client({
   intents: [
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMembers,
       GatewayIntentBits.GuildMessages,
       GatewayIntentBits.GuildMessageReactions,
       GatewayIntentBits.DirectMessages,
       GatewayIntentBits.DirectMessageReactions,
       GatewayIntentBits.MessageContent
   ],
   partials: [
       Partials.Channel,
       Partials.Guild,
       Partials.Message,
       Partials.Reaction
   ],
});

client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}

async function startUp() {
   for (const file of eventFiles) {
      const event = require(`./events/${file}`);

      if (event.once) {
         client.once(event.name, (...args) => event.execute(...args, client));
      } else {
         client.on(event.name, (...args) => event.execute(...args, client));
      }
   }
}

startUp();

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);