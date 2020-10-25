import dotenv from 'dotenv'
import { isLeft } from 'fp-ts/lib/Either'
import fs from 'fs-extra'
import * as t from 'io-ts'
import * as f from 'io-ts-fuzzy'
import path from 'path'


export const Env = t.exact(t.type({
	BOT_TOKEN: f.string,
}))

export type Env = t.TypeOf<typeof Env>;

export const readEnv = async (): Promise<Env> => {
	const envFile = path.join(__dirname, '../.env')

	const env = (await fs.stat(envFile).then(it => it.isFile).catch(() => false))
		? dotenv.parse(await fs.readFile(envFile))
		: {}


	const result = Env.decode({
		...process.env,
		...env,
	})

	if (isLeft(result)) {
		throw result.left
	}

	return result.right
}
