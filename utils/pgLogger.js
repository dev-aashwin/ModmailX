// utils/pgLogger.js
// Log moderation actions to PostgreSQL
const pool = require('./pgClient');

async function logInfraction({ userId, guildId, action, moderatorId, reason, duration }) {
  await pool.query(
    `INSERT INTO infractions (user_id, guild_id, action, moderator_id, reason, duration)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, guildId, action, moderatorId, reason, duration]
  );
}

async function logUserRole({ userId, roleId, guildId }) {
  await pool.query(
    `INSERT INTO user_roles (user_id, role_id, guild_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, role_id, guild_id) DO NOTHING`,
    [userId, roleId, guildId]
  );
}

module.exports = { logInfraction, logUserRole };
