import { Knex, knex } from 'knex'
import { join } from 'path'
import { Database as DB, env } from '../config/globals'
import { getChildLogger, getKnexLogger } from './logger'

let knexInstance: Knex<object, unknown[]> | Knex<any, unknown[]> | null

type KnexOptions = Knex.Config & { connection: { database: string } }

const log = getChildLogger('database')
const isDev = env.NODE_ENV === 'development'

async function createDatabaseIfNotExists(knexOptions: KnexOptions) {
	try {
		await getKnex().raw('SELECT 1+1 AS result')
		try {
			await getKnex().raw(`CREATE DATABASE ${DB.database}`)
			log.info(`db ${DB.database} CREATED`)
		} catch (error: any) {
			log.info(`db ${DB.database} EXISTS`)
		} finally {
			await getKnex().destroy()
			knexOptions.connection.database = DB.database
			knexInstance = knex(knexOptions)
			log.info(`db ${DB.database} SET`)
			await getKnex().raw(`CREATE SCHEMA IF NOT EXISTS ${DB.schema}`)
		}
	} catch (error: any) {
		log.error(error.message, { error })
		throw new Error('Could not initialize the data layer')
	}
}

async function runMigrations() {
	let migrationsFailed = true
	try {
		await getKnex().migrate.latest()
		migrationsFailed = false
	} catch (error: any) {
		console.error(error)
		log.error(error.message, { error })
		log.error('Error while migrating', {
			error
		})
	}

	if (migrationsFailed) {
		try {
			await getKnex().migrate.down()
		} catch (error) {
			log.error('Error while undoing last migration', {
				error
			})
		}
		throw new Error('Migrations failed')
	}
}

async function runSeeds() {
	try {
		await getKnex().seed.run()
	} catch (error: any) {
		log.error('Error while seeding', {
			error
		})
	}
}

export async function shutdownData() {

	log.info('Shutting down database connection')

	await getKnex().destroy()
	knexInstance = null

	log.info('Database connection closed')
}

export function getKnex() {
	if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance')
	return knexInstance
}


export async function initDbConnection() {
	const knexOptions: Knex.Config = {
		client: 'pg',
		connection: DB.uri ? DB.uri : {
			host: DB.host || 'localhost',
			database: DB.database || 'database',
			user: DB.user || 'postgres',
			password: DB.password || 'postgres',
			port: Number(DB.port) || 5433
		},
		debug: isDev,
		log: {
			debug: getKnexLogger(log, 'debug'),
			error: getKnexLogger(log, 'error'),
			warn: getKnexLogger(log, 'warn'),
			deprecate: (method, alternative) => log.warn('Knex reported something deprecated', {
				method,
				alternative
			})
		},
		pool: {
			min: DB.poolMin,
			max: DB.poolMax
		},
		acquireConnectionTimeout: 2000,
		migrations: {
			tableName: 'knex_meta',
			directory: join('migrations'),
			extension: 'ts'
		},
		seeds: {
			directory: join('seeds'),
			extension: 'ts'
		}
	}

	knexInstance = knex(knexOptions)

	// if using a uri the database will already exist
	if (!DB.uri) {
		await createDatabaseIfNotExists(knexOptions as KnexOptions)
	} else {
		await getKnex().raw(`CREATE SCHEMA IF NOT EXISTS ${DB.schema}`)
	}

	if (isDev) {
		await runMigrations()
	}
	// Run seeds in development
	if (isDev) {
		await runSeeds()
	}

	return knexInstance
}
