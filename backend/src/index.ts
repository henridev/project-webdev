import { logger } from './service/logger'
import createServer from './create-server'

const main = async () => {
	try {
		const server = createServer()
		await server.start()

		const onClose = async () => {
			await server.stop()
			logger.info('goodbye 👋')
			process.exit(0)
		}

		process.on('SIGTERM', onClose)
		process.on('SIGQUIT', onClose)

		return server
	} catch (error: any) {
		process.exit(-1)
	}
}

export default main()