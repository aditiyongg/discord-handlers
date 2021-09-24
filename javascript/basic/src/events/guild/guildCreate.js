// @ts-check
const { guildCreate } = require('../../../handler/events');

/**
 * @param {import('../../utils/client')} client 
 * @param {import('discord.js').Guild} guild 
 */
module.exports = async (client, guild) => {
    await guildCreate(client, guild);
};