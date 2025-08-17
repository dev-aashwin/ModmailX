-- db/schema.sql
-- PostgreSQL schema for XShield Bot moderation and infractions

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    username TEXT NOT NULL,
    discriminator TEXT,
    joined_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT,
    guild_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS infractions (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    guild_id BIGINT NOT NULL,
    action TEXT NOT NULL, -- ban, kick, mute, warn, etc.
    moderator_id BIGINT NOT NULL,
    reason TEXT,
    duration TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id),
    role_id BIGINT NOT NULL REFERENCES roles(id),
    guild_id BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id, guild_id)
);
