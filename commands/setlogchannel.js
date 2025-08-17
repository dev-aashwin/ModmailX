// commands/setlogchannel.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getGuildConfig, guildConfigs } = require('../config.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlogchannel')
    .setDescription('Set the moderation or bot log channel for this server')
    .addChannelOption(opt =>
      opt.setName('type').setDescription('Type of log channel').setRequired(true)
        .addChoices(
          { name: 'mod-log', value: 'modLogChannelId' },
          { name: 'bot-log', value: 'botLogChannelId' }
        )
    )
    .addChannelOption(opt =>
      opt.setName('channel').setDescription('Channel to use for logs').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const type = interaction.options.getString('type');
    const channel = interaction.options.getChannel('channel');
    const guildId = interaction.guild.id;
    let config = getGuildConfig(guildId);
    if (!config) {
      config = { guildId };
      guildConfigs.push(config);
    }
    config[type] = channel.id;
    await interaction.reply({ content: `✅ Set ${type.replace('ChannelId','')} to <#${channel.id}>.`, ephemeral: true });
    // Optionally: persist to file/db
  }
};
