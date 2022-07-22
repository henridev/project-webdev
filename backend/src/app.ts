import Koa from 'koa'

import { registerApiRoutes } from './api/components'
import registerMiddleware from './api/middleware/register-middleware'

const app = new Koa()

registerApiRoutes(registerMiddleware(app))

export default app