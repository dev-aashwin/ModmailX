require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const logAction = require('../utils/logger.js');

class WarnCommand {
  static data = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member in the server')
    .addUserOption(option =>
      option.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for warning'));

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    try {
      await target.send(`You have been warned in **${interaction.guild.name}**. Reason: ${reason}`);
    } catch (e) {
      // Ignore DM errors
    }
    await interaction.reply({ content: `⚠️ Warned ${target.tag}. Reason: ${reason}` });
    await logAction({
      client: interaction.client,
      action: 'Warn',
      moderator: interaction.user,
      target: target,
      reason: reason
    });
  }
}

module.exports = WarnCommand;
