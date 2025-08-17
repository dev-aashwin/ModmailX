// config.ts
// Per-guild settings for XShield Bot

export interface GuildConfig {
  guildId: string;
  modLogChannelId?: string;
  welcomeChannelId?: string;
  prefix?: string;
  botLogChannelId?: string;
  [key: string]: any;
}

export const guildConfigs: GuildConfig[] = [
  {
    guildId: 'YOUR_GUILD_ID',
    modLogChannelId: '1391137759174987937',
    botLogChannelId: '1391137760974340316',
    // Add other config as needed
  }
];

export function getGuildConfig(guildId: string): GuildConfig | undefined {
  return guildConfigs.find(cfg => cfg.guildId === guildId);
}
