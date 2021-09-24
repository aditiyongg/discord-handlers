// @ts-check
const Command = require('../../utils/command');

module.exports = class Ping extends Command {
    constructor (client) {
        super(client, {
            name: 'ping',
            description: 'Displays the bots websocket ping.',
            category: 'Misc'
        });
    }

    /**
     * @param {object} p
     * @param {import('../../utils/client')} p.client
     * @param {import('discord.js').CommandInteraction} p.interaction
     */
    async execute ({ client, interaction }) {
        /* Returning the ping */
        await client.utils.quickSuccess(interaction, `**Websocket Ping:** ${client.ws.ping}ms.`);
    }
}