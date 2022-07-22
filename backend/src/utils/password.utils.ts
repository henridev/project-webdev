import { hash, verify, argon2id } from 'argon2'
import { ARGON } from '../config/globals'

const { HASH_LEN, SALT_LEN, TIME_COST, MEMORY_COST } = ARGON

const options = {
	saltLength: +SALT_LEN,
	hashLength: +HASH_LEN,
	timeCost: +TIME_COST,
	memoryCost: +MEMORY_COST,
	type: argon2id
}

export const hashPassword = async (password: string): Promise<string> => {
	const hashResult = await hash(password, options)
	return hashResult
}

export const verifyPassword = async (password: string, passwordHash: string): Promise<boolean> => {
	const isValid = await verify(passwordHash, password, options)
	return isValid
}