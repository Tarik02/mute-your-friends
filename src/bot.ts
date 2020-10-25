import { Client as DiscordClient } from 'discord.js'

import { Env } from './env'


const MESSAGE_MUTE = '!mute'
const MESSAGE_UNMUTE = '!unmute'

export const main = async (env: Env, client: DiscordClient): Promise<void> => {
	client.on('message', async message => {
		let status: boolean

		switch (message.content) {
		case MESSAGE_MUTE:
			status = true
			break
		case MESSAGE_UNMUTE:
			status = false
			break
		default:
			return
		}

		const members = message.member?.voice.channel?.members

		if (!members) {
			await message.channel.send(':( You are not in any voice channel')
		}

		await Promise.all(
			members!.map(async member => {
				await member.voice.setMute(status)
			}),
		)

		if (status) {
			await message.channel.send(':) Muted successfully')
		} else {
			await message.channel.send(':) Unmuted successfully')
		}
	})
}
