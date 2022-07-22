import { Server } from 'http'
import { initDbConnection, shutdownData } from './service/db'
import { logger } from './service/logger'
import { env } from './config/globals'
import createSocket from './create-socket'
import app from './app'


const createServer = () => {
	let server: Server
	return {
		start: async () => {
			await initDbConnection()
			server = app.listen(env.PORT, () => logger.info(`in env ${env.NODE_ENV} listening on PORT ${env.PORT} 🚀`))
			createSocket(server)
			return await server
		},
		stop: async () => {
			await shutdownData()
			app.removeAllListeners()
			server.removeAllListeners()
			server.close()
		}
	}
}

export default createServer