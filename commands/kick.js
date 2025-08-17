require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const logAction = require('../utils/logger.js');

class KickCommand {
  static data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(option =>
      option.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for kick'));

  async execute(interaction) {
    if (!interaction.member.permissions.has('KickMembers')) {
      return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
    }
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id);
    if (!member.kickable) {
      return interaction.reply({ content: `❌ I can't kick this user.`, ephemeral: true });
    }
    try {
      await target.send(`You have been kicked from **${interaction.guild.name}**. Reason: ${reason}`);
    } catch (e) {}
    await member.kick(reason);
    await interaction.reply({ content: `✅ Kicked ${target.tag}.` });
    await logAction({
      client: interaction.client,
      action: 'Kick',
      moderator: interaction.user,
      target: target,
      reason: reason
    });
  }
}

module.exports = KickCommand;
