const com = require('../modules/common.js');
const discord = require('discord.js');
const {
   prefix
} = require('../config.json');

const cooldowns = new discord.Collection();

module.exports = {
   name: 'messageCreate',
   async execute(message, client) {
      try {
         if (message.author.bot)
            return;

         const msg = message.content.toLowerCase();
         let prefixLength, commandName, command, arguments;

         if (message.content.startsWith(prefix))
            prefixLength = prefix.length;

         commandName = message.content.slice(prefixLength).trim().split(/ +/g);
         commandName = commandName.shift().toLowerCase();
         arguments = message.content.split(/[ ]+/);

         if (message.content.startsWith(prefix))
            command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

         if (!command)
            return;

         if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new discord.Collection());

         const now = Date.now();
         const timestamps = cooldowns.get(command.name);
         const cooldownAmount = (command.cooldown || 0.5) * 1000;

         if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
               const timeLeft = (expirationTime - now) / 1000;
               return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
         }

         timestamps.set(message.author.id, now);
         setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

         try {
            command.execute(message, arguments);
         } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
         }
      }
      catch(err) {
         console.error(err);
      }
   }
}
