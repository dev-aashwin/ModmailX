# XShield Discord Moderation Bot

XShield is a modular, scalable Discord.js v14 moderation bot with per-guild config, advanced logging, and PostgreSQL/Prisma integration. 

## Features
- Slash command registry
- Per-guild config (dynamic log channels)
- Moderation logging to Discord and PostgreSQL
- Cloud database support (Railway)
- Modular command/event structure

## Setup
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your secrets
3. Install dependencies: `npm install`
4. Run migrations: `npx prisma migrate deploy`
5. Start the bot: `node index.js`

## Contributing
PRs welcome! Remove all secrets and personal data before sharing logs or configs.
