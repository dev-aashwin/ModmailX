// utils/dbLogger.js
// Simple JSON DB logger for moderation actions
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../logs/modlog-db.json');

function logToDB(action) {
  let logs = [];
  if (fs.existsSync(dbPath)) {
    logs = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }
  logs.push({ ...action, timestamp: new Date().toISOString() });
  fs.writeFileSync(dbPath, JSON.stringify(logs, null, 2));
}

module.exports = logToDB;
