// utils/presence.js
// Discord Rich Presence integration using discord-rpc

const RPC = require('discord-rpc');

// Set your Discord application's client ID here
const clientId = process.env.DISCORD_RPC_CLIENT_ID || 'YOUR_DISCORD_APP_CLIENT_ID';

// Only create the RPC client if a clientId is provided
if (!clientId || clientId === 'YOUR_DISCORD_APP_CLIENT_ID') {
  console.warn('No valid RPC client ID provided. Rich Presence will not be enabled.');
  module.exports = null;
  return;
}

const rpc = new RPC.Client({ transport: 'ipc' });

let currentActivity = {
  details: 'Shielding the server',
  state: 'Moderating Discord',
  startTimestamp: Date.now(),
  largeImageKey: 'shield',
  largeImageText: 'XShield Bot',
  smallImageKey: 'online',
  smallImageText: 'Online',
  instance: false,
  partyId: '1233119272444887198' // Set the user ID as the partyId for presence
};

function setActivity(activityOverrides = {}) {
  if (!rpc) return;
  currentActivity = { ...currentActivity, ...activityOverrides };
  rpc.setActivity(currentActivity);
}

rpc.on('ready', () => {
  setActivity();
  // Optionally update activity every 15 minutes
  setInterval(() => {
    setActivity();
  }, 15 * 60 * 1000);
});

function updateActivity(activityOverrides = {}) {
  setActivity(activityOverrides);
}

function connectRPC() {
  rpc.login({ clientId }).catch(console.error);
}

module.exports = { connectRPC, updateActivity };
