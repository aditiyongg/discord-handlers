// @ts-check
const HandlerClient = require('../../handler/client');

class Client extends HandlerClient {
    /** @param {import('discord.js').ClientOptions} options */
    constructor(options) {
        super(options);
    }
}

module.exports = Client;