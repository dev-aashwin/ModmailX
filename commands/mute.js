const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const logAction = require('../utils/logger.js');

class MuteCommand {
  static data = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a member in the server')
    .addUserOption(option =>
      option.setName('user').setDescription('User to mute').setRequired(true));

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(target.id);
    if (!member.moderatable) {
      return interaction.reply({ content: `❌ I can't mute this user.`, ephemeral: true });
    }
    try {
      await target.send(`You have been muted in **${interaction.guild.name}** for 10 minutes.`);
    } catch (e) {
      // Ignore DM errors
    }
    // 10 min timeout
    await member.timeout(10 * 60 * 1000, 'Muted by command');
    await interaction.reply({ content: `🔇 Muted ${target.tag} for 10 minutes.` });
    await logAction({
      client: interaction.client,
      action: 'Mute',
      moderator: interaction.user,
      target: target,
      reason: 'Muted for 10 minutes',
      duration: '10 minutes'
    });
  }
}

module.exports = MuteCommand;
