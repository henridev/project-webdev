const log = jest.createMockFromModule('../src/config/logger') as any

log.getChildLogger = jest.fn()
