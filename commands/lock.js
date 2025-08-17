// commands/lock.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock the current channel for a user or role')
    .addUserOption(option =>
      option.setName('user').setDescription('User to lock out').setRequired(false))
    .addRoleOption(option =>
      option.setName('role').setDescription('Role to lock out').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const targetId = user ? user.id : role ? role.id : null;
    if (!targetId) {
      return interaction.reply({ content: 'Please specify a user or role to lock out.', ephemeral: true });
    }
    try {
      await interaction.channel.permissionOverwrites.edit(targetId, {
        SendMessages: false
      });
      await interaction.reply({ content: `🔒 Channel locked for <@${targetId}>.` });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Failed to update channel permissions.', ephemeral: true });
    }
  }
};
