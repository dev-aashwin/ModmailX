module.exports = {
  data: {
    name: 'status',
    description: 'Update or check the bot status',
    options: [
      {
        name: 'state',
        type: 3, // STRING
        description: 'Set the bot status',
        required: false,
        choices: [
          { name: 'Online', value: 'online' },
          { name: 'Idle', value: 'idle' },
          { name: 'Do Not Disturb', value: 'dnd' },
          { name: 'Invisible', value: 'invisible' }
        ]
      }
    ]
  },
  async execute(interaction, client) {
    const state = interaction.options.getString('state');
    if (!state) {
      // Just check current status
      const currentStatus = client.user.presence?.status || 'unknown';
      return interaction.reply({ content: `Current bot status: **${currentStatus}**` });
    }
    // Set the bot status
    client.user.setPresence({ status: state });
    await interaction.reply({ content: `Bot status updated to **${state}**.` });
  }
};
