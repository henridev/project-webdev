/* eslint-disable @typescript-eslint/no-namespace */
import dotenv from 'dotenv'
import { join } from 'path'

export const envPath = join(__dirname, '..', '..', 'env', `.${process.env.NODE_ENV || 'missing'}.env`)

dotenv.config({ path: envPath })
const { env: e } = process

export const env = {
	CACHE_TTL: 3600,
	VERSION: e.VERSION,
	SERVER_APP: e.SERVER_APP || 'http://localhost:4000',
	WEB_APP: e.WEB_APP || 'http://localhost:3000',
	NODE_ENV: e.NODE_ENV || 'development',
	PORT: e.PORT || e.PORT || 8080,
	HTTP_PORT: e.HTTP_PORT || e.PORT || 8080,
	HTTPS_PORT: e.HTTPS_PORT || 3443,
	TIMEZONE: 'Europe/Brussels',
	DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss'
}

export namespace JWT {
	export const SECRET = e.SECRET_JWT || 'secret'
	export const EXPIRATION = e.TOKEN_EXPIRATION || (60 * 60 * 100)
	export const AUDIENCE = e.AUDIENCE || 'memes.hogent.be'
	export const ISSUER = e.ISSUER || 'memes.hogent.be'
}

export namespace ARGON {
	export const SALT_LEN = e.SALT_LEN || '16'
	export const HASH_LEN = e.HASH_LEN || '32'
	export const TIME_COST = e.TIME_COST || '6'
	export const MEMORY_COST = e.MEMORY_COST || '131072'
}

export namespace CLOUDINARY {
	export const API_SECRET = e.API_SECRET || ''
	export const API_KEY = e.API_KEY || '754651566586491'
	export const CLOUD_NAME = e.CLOUD_NAME || 'dri8yyakb'
}
export namespace Database {
	export const client = 'pg'
	export const uri = e.DATABASE_URL
	export const schema = e.DATABASE_SCHEMA || 'main'
	export const database = e.POSTGRES_DB || 'memes'
	export const user = e.POSTGRES_USER || 'postgres'
	export const password = e.POSTGRES_PASSWORD || 'postgres'
	export const hostname = e.DATABASE_HOSTNAME || 'localhost'
	export const host = e.DATABASE_HOST || 'localhost'
	export const port = +(e.DATABASE_PORT || '5432')
	export const poolMin = +(e.DATABASE_POOL_MIN || '0')
	export const poolMax = +(e.DATABASE_POOL_MAX || '100')
	export const timezone = e.DATABASE_TIME_ZONE || 'UTC'
	export const migration_dir = e.DATABASE_MIGRATION_DIR || 'migrations'
	export const seed_dir = e.DATABASE_SEED_DIR || 'seeds'
}

export namespace T {
	export const SCHEMA = Database.schema
	export const USER = 'T_USER'
	export const MEME = 'T_MEME'
	export const T_MEME_GAME = 'T_MEME_GAME'
	export const GAME = 'T_GAME'
	export const ROLE = 'T_ROLE'
	export const AUTHORITY = 'T_AUTHORITY'
	export const FRIENDSHIP = 'T_FRIENDSHIP'
}
