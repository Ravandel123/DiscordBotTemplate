const commons = require('../modules/common.js');

module.exports = {
   name: 'say',
   description: 'Says something.',
   usage: '[something you want to say] ',
   example: 'test',
   execute(message, args) {
      if (!args[1])
         commons.respondToMessage(message, `There are no arguments provided!`);
      else
         commons.respondToMessage(message, message.content.slice(args[0].length));
   },
}