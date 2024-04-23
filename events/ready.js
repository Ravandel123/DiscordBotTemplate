module.exports = {
   name: 'ready',
   once: true,
   execute(client) {
      console.log('Ready!');
      console.log(`Connected to:`);
      client.guilds.cache.forEach(guild => console.log('Name: ' + guild.name + ', ID: ' + guild.id))
      client.user.setStatus('available')
      client.user.setPresence({ activities: [{ name: `Solitaire` }] });
   },
};


