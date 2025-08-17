# XShield Discord Moderation Bot

[![npm version](https://img.shields.io/npm/v/xshield.svg?style=flat&color=blue)](https://www.npmjs.com/package/xshield)
[![npm downloads](https://img.shields.io/npm/dw/xshield.svg?style=flat&color=green)](https://www.npmjs.com/package/xshield)
[![SLSA Provenance](https://github.com/dev-aashwin/ModmailX/actions/workflows/generator-generic-ossf-slsa3-publish.yml/badge.svg)](https://github.com/dev-aashwin/ModmailX/actions/workflows/generator-generic-ossf-slsa3-publish.yml)

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

## Security

This project follows the [OpenSSF SLSA](https://slsa.dev) framework for supply-chain security.  
Each release is built in GitHub Actions and accompanied by a **SLSA Level 3 provenance file**, which ensures:
- Builds are reproducible and verifiable
- Release artifacts can be traced back to their source
- Consumers have higher confidence in the integrity of the code

## Contributing
PRs welcome! Remove all secrets and personal data before sharing logs or configs.
