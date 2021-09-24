// @ts-check
const { interactionCreate } = require('../../../handler/events');

/**
 * @param {import('../../utils/client')} client 
 * @param {import('discord.js').Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    await interactionCreate(client, interaction);
}