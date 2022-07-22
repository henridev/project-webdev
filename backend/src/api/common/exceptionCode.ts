export enum ExceptionCode {
	ERR_TECH_001 = 'Server is currently unavailable try again later',
	ERR_TECH_002 = 'image upload error',
	ERR_TECH_999 = 'Unknown error',
	ERR_OP_001 = 'Unauthenticated route',
	ERR_OP_002 = 'Unauthorized route',
	ERR_OP_003 = 'The email or username has been take',
	ERR_OP_004 = 'The login is invalid',
	ERR_OP_005 = 'Invalid auth token',
	ERR_OP_006 = 'Missing User',
	ERR_OP_007 = 'Duplicate User',
	ERR_OP_008 = 'Already in friendslist',
}



export function findKeyFromValue(code: ExceptionCode) {
	for (const enm in ExceptionCode) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const index: keyof typeof ExceptionCode = enm as any
		if (ExceptionCode[index] === code) {
			return enm
		}
	}
	return null
}