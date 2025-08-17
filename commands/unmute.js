require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const logAction = require('../utils/logger.js');

class UnmuteCommand {
  static data = new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a member in the server')
    .addUserOption(option =>
      option.setName('user').setDescription('User to unmute').setRequired(true));

  async execute(interaction) {
    if (!interaction.member.permissions.has('ModerateMembers')) {
      return interaction.reply({ content: 'You do not have permission to unmute members.', ephemeral: true });
    }
    const target = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(target.id);
    if (!member.moderatable) {
      return interaction.reply({ content: `❌ I can't unmute this user.`, ephemeral: true });
    }
    try {
      await target.send(`You have been unmuted in **${interaction.guild.name}**.`);
    } catch (e) {}
    await member.timeout(null, 'Unmuted by command');
    await interaction.reply({ content: `🔊 Unmuted ${target.tag}.` });
    await logAction({
      client: interaction.client,
      action: 'Unmute',
      moderator: interaction.user,
      target: target
    });
  }
}

module.exports = UnmuteCommand;
