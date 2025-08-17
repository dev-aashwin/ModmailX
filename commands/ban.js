require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const logAction = require('../utils/logger.js');
const prisma = require('../utils/prismaClient');

class BanCommand {
  static data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(option =>
      option.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for ban'));

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id);
    if (!member.bannable) {
      return interaction.reply({ content: `❌ I can't ban this user.`, ephemeral: true });
    }
    try {
      await target.send(`You have been banned from **${interaction.guild.name}**. Reason: ${reason}`);
    } catch (e) {
      // Ignore DM errors
    }
    await member.ban({ reason });
    await interaction.reply({ content: `✅ Banned ${target.tag}.` });
    await logAction({
      client: interaction.client,
      action: 'Ban',
      moderator: interaction.user,
      target: target,
      reason: reason
    });
    // Prisma logging
    try {
      await prisma.infraction.create({
        data: {
          user: {
            connectOrCreate: {
              where: { id: BigInt(target.id) },
              create: {
                id: BigInt(target.id),
                username: target.username,
                discriminator: target.discriminator
              }
            }
          },
          guild_id: BigInt(interaction.guild.id),
          action: 'Ban',
          moderator_id: BigInt(interaction.user.id),
          reason: reason
        }
      });
    } catch (err) {
      console.error('Failed to log infraction to DB:', err);
    }
  }
}

module.exports = BanCommand;
