import createServer from '../create-server'

const getServer = async () => {
	const server = await createServer().start()
	return server
}

export default getServer