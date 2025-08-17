const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.commands = new Map();
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    try {
      const command = require(path.join(commandsPath, file));
      if (!command.data || !command.data.name || typeof command.execute !== 'function') {
        console.error(`❌ Command file ${file} is missing required properties.`);
        continue;
      }
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);
    } catch (err) {
      console.error(`❌ Error loading command file ${file}:`, err);
    }
  }
};
