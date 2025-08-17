// Example usage of config.ts in a handler or command
const { getGuildConfig } = require('../config.ts');

module.exports = (client) => {
  client.on('someEvent', async (event) => {
    const guildId = event.guild?.id;
    if (!guildId) return;
    const config = getGuildConfig(guildId);
    if (config && config.modLogChannelId) {
      // Use config.modLogChannelId for logging
      const channel = client.channels.cache.get(config.modLogChannelId);
      if (channel && channel.isTextBased()) {
        channel.send('This is a test log message!');
      }
    }
  });
};
