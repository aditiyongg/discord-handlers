// @ts-check
const HandlerCommand = require('../../handler/command');

class Command extends HandlerCommand {
    /**
     * @param {import('./client')} client 
     * @param {import('../../handler/command').CommandOptions} options 
     */
    constructor(client, options) {
        super(client, options);
    }
}

module.exports = Command;