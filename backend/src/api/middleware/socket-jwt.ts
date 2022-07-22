import { ExtendedError } from 'socket.io/dist/namespace'
import { MySocket } from '../../create-socket'
import { verifyJWT } from '../../utils'

const socketJwtMiddleware = async (socket: MySocket, next: (err?: ExtendedError) => void) => {
	const query = socket.handshake.query
	const token = query.token as string

	// verify token
	const { userId, name } = await verifyJWT(token)
	if (userId) {
		socket.data.userId = userId
		socket.data.userName = name
		next()
	}
}

export default socketJwtMiddleware