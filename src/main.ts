import { Client as DiscordClient } from 'discord.js'

import { main as botMain } from './bot'
import { readEnv } from './env'
import { waitForProcessInterrupt } from './utils/waitForProcessInterrupt'


const main = async () => {
	const env = await readEnv()
	const client = new DiscordClient()

	await client.login(env.BOT_TOKEN)

	await botMain(env, client)

	await waitForProcessInterrupt()

	client.destroy()

	return 0
}

main()
	.then(exitCode => process.exit(exitCode))
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
