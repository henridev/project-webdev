const logger = {
	...jest.requireActual('winston')
	// transports: {
	// 	Console: jest.fn(),
	// 	File: jest.fn()
	// },
	// createLogger: jest.fn().mockImplementation(function (creationOpts) {
	// 	return {
	// 		info: jest.fn(),
	// 		warn: jest.fn(),
	// 		error: jest.fn(),
	// 		add: jest.fn()
	// 	}
	// }),
	// child: jest.fn()
}

module.exports = logger