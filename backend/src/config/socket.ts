import { ServerOptions } from 'socket.io'
import { origins } from './cors'


const socketServerOptions: Partial<ServerOptions> = {
	cors: {
		origin: origins,
		methods: ['GET', 'POST']
	}
}


export default socketServerOptions