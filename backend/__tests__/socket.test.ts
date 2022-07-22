import { io } from 'socket.io-client'
import http, { Server } from 'http'
import { Socket } from 'socket.io'
import createSocket, { ClientToServerEvents, MySocketServer, ServerToClientEvents } from 'backend/src/create-socket'
import { AddressInfo } from 'net'
import { generateJWT } from 'backend/src/utils'
import { ADMIN } from '../__mocks__/data/users'

let socketClient: Socket<ServerToClientEvents, ClientToServerEvents>
let httpServer: Server
let ioServer: MySocketServer
let httpServerAddr: AddressInfo

//  Setup WS & HTTP servers
beforeAll((done) => {
	httpServer = http.createServer().listen()
	httpServerAddr = httpServer.address() as AddressInfo
	ioServer = createSocket(httpServer)
	done()
})



// Cleanup WS & HTTP servers
afterAll((done) => {
	ioServer.close()
	httpServer.close()
	done()
})

/**
 * Run before each test
 */
beforeEach((done) => {
	generateJWT(ADMIN).then(token => {
		socketClient = io(`http://[${httpServerAddr!.address}]:${httpServerAddr!.port}`, {
			// eslint-disable-next-line max-len
			query: { token },
			autoConnect: true
		}) as unknown as Socket<ServerToClientEvents, ClientToServerEvents>
		socketClient.on('connect' as any, () => {
			done()
		})
	})
})

/**
 * Run after each test
 */
afterEach((done) => {
	// Cleanup
	if (socketClient.connected) {
		socketClient.disconnect()
	}
	done()
})


describe('basic socket.io example', () => {
	it('should communicate', (done) => {
		ioServer.emit('pong')
		socketClient.once('pong', () => {
			done()
		})
		ioServer.on('connection', (mySocket) => {
			expect(mySocket).toBeDefined()
		})
	})
})