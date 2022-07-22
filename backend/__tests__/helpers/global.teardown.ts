import { T } from 'backend/src/config/globals'
import { getKnex, shutdownData } from 'backend/src/service/db'

const teardown = async () => {
	console.log('============= TEARDOWN START ============')
	await getKnex().withSchema(T.SCHEMA).table(T.USER).delete()
	await getKnex().withSchema(T.SCHEMA).table(T.FRIENDSHIP).delete()
	await getKnex().withSchema(T.SCHEMA).table(T.MEME).delete()

	await shutdownData()
	console.log('=============  TEARDOWN END  ============')
}




export default teardown