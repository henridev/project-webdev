import { createLogger, format, Logger, transports } from 'winston'
import { existsSync, mkdirSync } from 'fs'
import { isArray } from 'lodash'
import { join } from 'path'

import { env, Database } from '../config/globals'
import logConfig, { LogLevel } from '../config/logger'

const { NODE_ENV } = env
const { database: DB_NAME } = Database
const { directory: logDir, files } = logConfig

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
	mkdirSync(logDir)
}


const errorLog = join(logDir, files.error)
const requestLog = join(logDir, files.request)
const combinedLog = join(logDir, files.combined)
const exceptionsLog = join(logDir, files.exceptions)

const isRequest = format((info) => {
	if (info.isRequest) {
		return info
	}
	return false
})

const logFileFormat = format.combine(
	format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss'
	}),
	format.printf((info) => {
		const { timestamp, level, message } = info
		return `${timestamp} ${level}: ${message}`
	})
)


const logFiletransports = [
	new transports.File({
		filename: errorLog,
		level: 'error'
	}),
	new transports.File({
		filename: requestLog,
		format: format.combine(isRequest())
	}),
	new transports.File({
		filename: combinedLog
	})
]


export const logger = createLogger({
	level: 'info',
	defaultMeta: { NODE_ENV, DB_NAME },
	format: logFileFormat,
	transports: NODE_ENV !== 'test' ? logFiletransports : [],
	exceptionHandlers: [
		new transports.File({
			filename: exceptionsLog
		})
	]
})

const logConsoleFormat = format.combine(
	format.colorize(),
	format.printf((info) => {
		const { timestamp, level, message, name = 'server', ...rest } = info
		const [date, time] = timestamp.split(' ')
		return `${date} | ${time} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`
	})
)

logger.add(
	new transports.Console({
		format: logConsoleFormat,
		level: 'debug'
	})
)

export const getChildLogger = (name: string, meta = {}) => {
	const previousName = logger.defaultMeta?.name

	return logger.child({
		name: previousName ? `${previousName}.${name}` : name,
		previousName,
		...meta
	})
}

export const getKnexLogger = (logger: Logger, level: LogLevel) => (message: { sql: unknown }[] | { sql: unknown }) => {
	if (isArray(message)) {
		message?.forEach((innerMessage) =>
			logger.log(level, innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)))
	} else if (message.sql) {
		logger.log(level, message.sql)
	} else {
		logger.log(level, JSON.stringify(message))
	}
}
