const { prefix } = require('../config.json')

module.exports = {
   name: 'commands',
   description: 'Lists all commands or shows info about a specific command.',
   aliases: ['command'],
   usage: '[command name]',
   example: 'name',
   execute(message, args)
   {
      let data;
      const { commands } = message.client

      if (!args[1])
      {
         data = `Here's a list of all regular commands:\n`;
         data += commands.map(command => command.name).join(', ');
         data += `\nYou can send \`${prefix}commands [command name]\` to get info on a specific command.`;

         return message.author.send(data)
            .then(() => {
               if (message.channel.type === 'dm')
                  return

               message.reply('I\'ve sent you a DM with all my normal commands.')
            })
            .catch(error => {
               console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
               message.reply('it seems like I can\'t DM you! Do you have DMs disabled?')
            })
      }
      else
      {
         const name = args[1].toLowerCase()
         const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

         if (!command)
            return message.reply('that\'s not a valid command!')

         data = `**Name:** ${command.name}\n`;

         if (command.aliases) data += `**Aliases:** ${command.aliases.join(', ')}\n`;
         if (command.cooldown) data += `**Cooldown:** ${command.cooldown}\n`;
         if (command.description) data += `**Description:** ${command.description}\n`;
         if (command.usage) data += `**Usage:** ${prefix}${command.name} ${command.usage}\n`;
         if (command.example) data += `**Example 1:** ${prefix}${command.name} ${command.example}\n`;
         if (command.otherexample) data += `**Example 2:** ${prefix}${command.name} ${command.otherexample}\n`;

         message.channel.send(data);
      }
   },
}