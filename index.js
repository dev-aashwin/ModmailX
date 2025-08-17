const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const logEvent = require('./utils/logEvent');
const presence = require('./utils/presence');

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const RPC_CLIENT_ID = process.env.DISCORD_RPC_CLIENT_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences
  ]
});

require('./handlers/commandHandler')(client);
require('./handlers/interactionHandler')(client);
require('./events/clientEvents')(client);

client.login(TOKEN);
