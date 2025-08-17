module.exports = (client) => {
  client.on('interactionCreate', async interaction => {
    if (interaction.isStringSelectMenu() && (interaction.customId === 'selfrole_menu' || interaction.customId === 'role_selector')) {
      const selected = interaction.values[0];
      const allowedRoleNames = interaction.component.options.map(opt => opt.value);
      if (!allowedRoleNames.includes(selected)) {
        await interaction.reply({ content: '❌ Invalid role selection.', ephemeral: true });
        return;
      }
      const role = interaction.guild.roles.cache.find(r => r.name === selected);
      if (!role) {
        await interaction.reply({ content: `❌ Role not found: ${selected}`, ephemeral: true });
        return;
      }
      const hasRole = interaction.member.roles.cache.has(role.id);
      if (interaction.customId === 'role_selector') {
        if (hasRole) {
          await interaction.member.roles.remove(role);
          await interaction.reply({ content: `🔁 Removed role: ${role.name}`, ephemeral: true });
        } else {
          await interaction.member.roles.add(role);
          await interaction.reply({ content: `✅ You’ve been given the **${role.name}** role!`, ephemeral: true });
        }
      } else {
        try {
          await interaction.member.roles.add(role);
          await interaction.reply({ content: `✅ You have been given the **${role.name}** role!`, ephemeral: true });
        } catch (err) {
          await interaction.reply({ content: '❌ Failed to assign the role. Please contact an admin.', ephemeral: true });
        }
      }
      return;
    }

    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`❌ Command not found: ${interaction.commandName}`);
      return;
    }
    try {
      await command.execute(interaction, client);
      require('../utils/logEvent')(`Command executed: ${interaction.commandName} by ${interaction.user.tag}`);
    } catch (error) {
      console.error('❌ Error executing command:', error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
      }
      require('../utils/logEvent')(`Error executing command: ${interaction.commandName} by ${interaction.user.tag}`);
    }
  });
};
