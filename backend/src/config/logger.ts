const logConfig = {
	directory: 'logs',
	files: {
		error: 'error.log',
		request: 'request.log',
		combined: 'combined.log',
		exceptions: 'exceptions.log'
	}

}

export type LogLevel = 'http' | 'warn' | 'error' | 'silly' | 'info' | 'debug'

export default logConfig