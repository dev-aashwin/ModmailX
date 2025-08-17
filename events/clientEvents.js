module.exports = (client) => {
  client.once('ready', async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    try {
      await client.user.setPresence({
        status: 'online',
        activities: [{ name: 'Shielding the server', type: 0 }]
      });
      console.log('✅ Presence set successfully.');
    } catch (err) {
      console.error('❌ Failed to set presence:', err);
    }
    const channel = client.channels.cache.get(process.env.PRESENCE_ID);
    if (channel && channel.isTextBased()) {
      channel.send('✅ **XShield Bot is now online and operational!**');
    } else {
      console.error('❌ Could not find the status channel or it is not text-based.');
    }
    const presence = require('../utils/presence');
    if (presence && presence.connectRPC) {
      presence.connectRPC();
    }
  });

  client.on('presenceUpdate', (oldPresence, newPresence) => {
    const channel = client.channels.cache.get(process.env.PRESENCE_ID);
    if (channel && channel.isTextBased()) {
      const userTag = newPresence.user?.tag || newPresence.userId;
      const status = newPresence.status;
      channel.send(`ℹ️ Presence update: **${userTag}** is now **${status}**`).catch(console.error);
    } else {
      console.error('❌ Could not find the status channel or it is not text-based.');
    }
  });

  process.on('SIGINT', async () => {
    const channel = client.channels.cache.get(process.env.PRESENCE_ID);
    if (channel && channel.isTextBased()) {
      await channel.send('🛑 **XShield Bot has gone offline for maintenance.**');
    } else {
      console.error('❌ Could not find the status channel or it is not text-based.');
    }
    process.exit();
  });
};
