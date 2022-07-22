import { camelCase, isNil, map, mapKeys, omitBy, pick, snakeCase, upperFirst, difference } from 'lodash'

export const converObjectToCamelCase = (obj: Record<string, unknown> | object) => mapKeys(obj, (v, k) => camelCase(k))
export const converObjectToSnakeCase = (obj: Record<string, unknown> | object) => mapKeys(obj, (v, k) => snakeCase(k))
export const removeFieldsAndNil = (obj: Record<string, unknown> | object, fieldsToOmit: string[]) => omitBy(pick(obj, fieldsToOmit), isNil)

export const parseForDB = (obj: Record<string, unknown> | object, fieldsToInclude: string[]) => removeFieldsAndNil(
	converObjectToSnakeCase(obj),
	Object.values(fieldsToInclude)
)

type SelectViaAliasesInfo = { alias: string, fields: string[], prefix?: string, excludeFields?: string[] }

export const selectViaAliases = (
	args: SelectViaAliasesInfo[],
	options: { convertCamel?: boolean } = {}
) => {

	args = map(args, (arg) => {
		const { fields, prefix, excludeFields = [] } = arg
		if (prefix && options.convertCamel) {
			return { ...arg, fields: map(difference(fields, excludeFields), (f) => `${f} as ${prefix + upperFirst(camelCase(f))}`) }
		}
		if (options.convertCamel) {
			return { ...arg, fields: map(difference(fields, excludeFields), camelCase) }
		}
		return arg
	})

	// logger.debug(JSON.stringify(args))

	return args.flatMap(({ alias, fields }) =>
		fields.map((f) => alias + '.' + f)
	)
}
