import { join } from 'path'
import dotenv from 'dotenv'
import Knex from 'knex'
import { Database } from './src/config/globals'

dotenv.config({ path: join(__dirname, 'env', `.${process.env.NODE_ENV || 'missing'}.env`) })

const config = {
	client: 'pg',
	connection: Database.uri ? Database.uri : {
		host: Database.host || 'localhost',
		database: Database.database || 'database',
		user: Database.user || 'postgres',
		password: Database.password || 'postgres',
		port: Number(Database.port) || 5433
	},
	pool: {
		min: Number(Database.poolMin) || 0,
		max: Number(Database.poolMax) || 10
	},
	migrations: {
		tableName: 'KnexMigrations',
		directory: Database.migration_dir || 'migrations',
		schemaName: Database.schema || 'main',
		extension: 'ts'
	},
	seeds: {
		directory: Database.seed_dir || 'seeds',
		extension: 'ts'
	}
};

(async function initSchema() {
	const connection = Knex(config)
	const schema = Database.schema || 'main'
	try {
		// in case some postgres extension functions are useds
		// await knex.schema
		//   .withSchema(schema)
		//   .raw(`CREATE EXTENSION IF NOT EXISTS ${extension}`);
		await connection.raw(`CREATE SCHEMA IF NOT EXISTS ${schema}`)
	} catch (error) {
		throw new Error(`Unable create schema ${schema} with error ${error}`)
	}
})()

module.exports = config
