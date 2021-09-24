// @ts-check
const HandlerUtils = require('../../handler/utils');

class Utils extends HandlerUtils {
    /** @param {import('./client')} client*/
    constructor(client) {
        super(client);
    }
}

module.exports = Utils;