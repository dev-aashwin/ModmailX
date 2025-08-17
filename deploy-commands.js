// deploy-commands.js
// Overwrites all global slash commands for your bot with the new set
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
  // 🔐 Verification & Roles Commands
  new SlashCommandBuilder().setName('verify').setDescription('Assigns the "Verified Member" role to the user'),
  new SlashCommandBuilder().setName('selfroles').setDescription('Opens a dropdown for users to select self-assignable roles'),
  new SlashCommandBuilder().setName('addrole').setDescription('Add a role to a specific user')
    .addUserOption(opt => opt.setName('user').setDescription('User to add role to').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to add').setRequired(true)),
  new SlashCommandBuilder().setName('removerole').setDescription('Remove a role from a specific user')
    .addUserOption(opt => opt.setName('user').setDescription('User to remove role from').setRequired(true))
    .addRoleOption(opt => opt.setName('role').setDescription('Role to remove').setRequired(true)),
  new SlashCommandBuilder().setName('createrole').setDescription('Create a new role in the server (admin only)')
    .addStringOption(opt => opt.setName('name').setDescription('Name of the new role').setRequired(true)),
  new SlashCommandBuilder().setName('listroles').setDescription('Show a list of all server roles'),

  // 🛡️ Moderation Commands
  new SlashCommandBuilder().setName('kick').setDescription('Kick a user from the server')
    .addUserOption(opt => opt.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick').setRequired(false)),
  new SlashCommandBuilder().setName('ban').setDescription('Ban a user from the server')
    .addUserOption(opt => opt.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban').setRequired(false)),
  new SlashCommandBuilder().setName('unban').setDescription('Unban a user by their ID')
    .addStringOption(opt => opt.setName('userid').setDescription('ID of the user to unban').setRequired(true)),
  new SlashCommandBuilder().setName('timeout').setDescription('Temporarily timeout a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to timeout').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Timeout duration in minutes').setRequired(true)),
  new SlashCommandBuilder().setName('warn').setDescription('Warn a user and optionally log it')
    .addUserOption(opt => opt.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(false)),
  new SlashCommandBuilder().setName('mute').setDescription('Mute a user (assigns "Muted" role)')
    .addUserOption(opt => opt.setName('user').setDescription('User to mute').setRequired(true)),
  new SlashCommandBuilder().setName('unmute').setDescription('Unmute a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to unmute').setRequired(true)),
  new SlashCommandBuilder().setName('purge').setDescription('Delete multiple messages in a channel (max 100)')
    .addIntegerOption(opt => opt.setName('count').setDescription('Number of messages to delete').setRequired(true)),
  new SlashCommandBuilder().setName('modlogs').setDescription('View recent moderation actions taken by the bot'),

  // ⚙️ Configuration & Admin Tools Commands
  new SlashCommandBuilder().setName('setup').setDescription('Guide to configure essential bot features'),
  new SlashCommandBuilder().setName('setlogchannel').setDescription('Set the channel for moderation logs')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel for logs').setRequired(true)),
  new SlashCommandBuilder().setName('setrolemenu').setDescription('Bind role selector to a channel')
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel to bind role menu').setRequired(true)),
  new SlashCommandBuilder().setName('setverifyrole').setDescription('Set the default "Verified" role for /verify')
    .addRoleOption(opt => opt.setName('role').setDescription('Role to set as verified').setRequired(true)),
  new SlashCommandBuilder().setName('setmuterole').setDescription('Set the default "Muted" role')
    .addRoleOption(opt => opt.setName('role').setDescription('Role to set as muted').setRequired(true)),

  // 📈 Utility & Server Info Commands
  new SlashCommandBuilder().setName('help').setDescription('Show all XShield Bot commands and categories'),
  new SlashCommandBuilder().setName('ping').setDescription('Show bot latency'),
  new SlashCommandBuilder().setName('uptime').setDescription('Show how long the bot has been running'),
  new SlashCommandBuilder().setName('userinfo').setDescription('Display information about a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to get info about').setRequired(false)),
  new SlashCommandBuilder().setName('serverinfo').setDescription('Display server stats and details'),
  new SlashCommandBuilder().setName('botinfo').setDescription('Show bot version, uptime, and developer info'),
  new SlashCommandBuilder().setName('avatar').setDescription('Show a user’s avatar')
    .addUserOption(opt => opt.setName('user').setDescription('User to get avatar of').setRequired(false)),
  new SlashCommandBuilder().setName('roles').setDescription('List all roles on the server'),
]
  .map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('⏳ Started refreshing global (all servers) application commands.');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log('✅ Successfully reloaded global application commands.');
  } catch (error) {
    console.error(error);
  }
})();
