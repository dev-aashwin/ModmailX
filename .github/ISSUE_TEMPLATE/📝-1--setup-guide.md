---
name: "\U0001F4DD 1. Setup Guide"
about: This guide explains how to set up **XShield**, a modular Discord moderation
  bot.
title: ''
labels: ''
assignees: ''

---

## Requirements
- Node.js 18+
- PostgreSQL database
- Discord bot token (from the [Discord Developer Portal](https://discord.com/developers/applications))
- Git & npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dev-aashwin/XShield.git
   cd XShield

Copy the environment file:

cp .env.example .env


Fill in the required values:

DISCORD_TOKEN

DATABASE_URL

Install dependencies:

npm install


Run database migrations:

npx prisma migrate deploy


Start the bot:

node index.js

Hosting

Local development: Run directly with Node.js.

Production hosting: Railway, Docker, or any VPS.

Keep-alive: Use PM2 or Docker for long-term hosting.


---

## 📝 2. Commands List
```markdown
# Commands List

Here’s a reference of available slash commands.

## Moderation
- `/ban <user> [reason]` → Ban a user from the guild.
- `/kick <user> [reason]` → Kick a user.
- `/mute <user> <duration>` → Mute a user for a set time.
- `/unmute <user>` → Unmute a user.

## Configuration
- `/config set logchannel <channel>` → Set moderation log channel.
- `/config view` → Show current configuration.

## Utility
- `/ping` → Bot latency check.
- `/help` → Show help menu.

_This list will expand as new features are added._

📝 3. FAQ / Troubleshooting
# FAQ / Troubleshooting

## Why isn’t the bot responding?
- Make sure the bot is invited with **application.commands** and **moderation permissions**.
- Check that your token in `.env` is valid.

## Database errors (Prisma)
- Verify `DATABASE_URL` in `.env`.
- Run:
  ```bash
  npx prisma migrate deploy

Logs not appearing

Check that you have set the log channel with /config set logchannel.

Ensure the bot has permission to send messages in that channel.

Bot keeps going offline

If running locally, keep the terminal open.

For production, use PM2 or Docker to keep the process alive.


---

## 📝 4. Contributing Guide
```markdown
# Contributing Guide

Thanks for considering contributing to **XShield** 🎉

## How to Contribute
1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/amazing-feature


Make your changes

Commit with a clear message:

git commit -m "Add amazing feature"


Push and open a Pull Request

Coding Guidelines

Follow the project’s modular structure (/commands, /events, etc.)

Use ESLint for code quality

Document new commands and add examples in the Wiki

Reporting Issues

Use the Bug Report issue template

Include logs, steps to reproduce, and your environment
