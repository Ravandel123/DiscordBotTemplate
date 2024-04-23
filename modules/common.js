const discord = require('discord.js');


// ---------------------------------------------------------------------------------------------------------------
function respondToMessage(message, messageContent)
{
   if (message && messageContent)
      message.channel.send(messageContent);
}

module.exports.respondToMessage = respondToMessage;
// ---------------------------------------------------------------------------------------------------------------
