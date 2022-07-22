const swagger: any = jest.createMockFromModule('../src/api/middleware/swagger')

swagger.registerSwagger = jest.fn()

export default swagger