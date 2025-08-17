const fs = require('fs');
const path = require('path');
const sendWebhook = require('./webhookLogger');
const { getGuildConfig } = require('../config.ts');
const logToDB = require('./dbLogger');

async function logger({ client, action, moderator, target, reason, duration }) {
  const guildId = client.guilds.cache.first()?.id || (moderator && moderator.guild?.id);
  const config = guildId ? getGuildConfig(guildId) : undefined;
  const logEntry = {
    action,
    moderator: moderator?.tag || moderator,
    target: target?.tag || target,
    reason,
    duration,
    time: new Date().toISOString(),
    guildId
  };
  logToDB(logEntry);
  if (client && config && config.modLogChannelId) {
    const channel = client.channels.cache.get(config.modLogChannelId);
    if (channel && channel.isTextBased()) {
      const embed = {
        color: 0xffa500,
        title: `🛡️ Moderation Action: ${action}`,
        fields: [
          { name: 'Moderator', value: logEntry.moderator, inline: true },
          { name: 'Target', value: logEntry.target, inline: true },
        ],
        timestamp: logEntry.time,
      };
      if (reason) embed.fields.push({ name: 'Reason', value: reason, inline: false });
      if (duration) embed.fields.push({ name: 'Duration', value: duration, inline: false });
      embed.fields.push({ name: 'Time', value: `<t:${Math.floor(Date.now()/1000)}:F>`, inline: false });
      await channel.send({ embeds: [embed] });
    }
  }
}

module.exports = logger;
