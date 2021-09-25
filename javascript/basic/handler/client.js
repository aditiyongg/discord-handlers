/*
    Author: Bullet_Tide.
    Note: Please refrain from editing in this file.
          Any changes made in this file could be
          overwritten upon pulling any commits from
          the main repo.
*/

// @ts-check
const { Client, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./registry');

class HandlerClient extends Client {

    /** @param {import('discord.js').ClientOptions} options */
    constructor(options) {
        super(options);

        /** @type {Collection<string, import('../src/utils/command')>} */
        this.commands = new Collection();

        /** @type {Collection<string, string[]>} */
        this.categories = new Collection();

        /** @type {import('../config/config.json')} */
        this.config = require('../config/config.json');
        
        /** @type {import('../config/languages.json')} */
        this.languages = require('../config/languages.json');
        
        /** @type {import('../src/utils/utils')} */
        this.utils = new (require('../src/utils/utils'))(this);
    }

    async loadCommands () {
        if (!this.application?.owner) await this.application?.fetch();

        await registerCommands(this, '../src/commands');

        const guildCommands = toApplicationCommand(this.commands.filter(s => s.development));
        const globalCommands = toApplicationCommand(this.commands.filter(s => !s.development));

        if (guildCommands.length) {
            const guild = await this.guilds.fetch(this.config.DEV_SERVERS[0]);
            await guild.commands.set(guildCommands);
        }

        if (globalCommands.length) await this.application.commands.set(globalCommands);

        const devOnly = this.commands.filter(s => s.devOnly).values();
        for (const command of devOnly) {
            if (command.development) {
                const guild = await this.guilds.fetch(this.config.DEV_SERVERS[0]);
                await guild.commands.cache.find(c => c.name === command.name).permissions.set({ permissions: this.config.DEVS.map(id => { return { id, type: 'USER', permission: true } }) });
            }
        }
    }

    async loadEvents () {
        await registerEvents(this, '../src/events');
    }

    /** @param {string} token */
    async login (token) {
        try {
            this.utils.log('WARNING', 'src/util/client.js', 'Loading events...');
            await this.loadEvents();
            this.utils.log('SUCCESS', 'src/util/client.js', 'Loaded all events!');
        } catch (e) {
            this.utils.log('ERROR', 'src/util/client.js', `Error loading events: ${e}`);
        }

        try {
            this.utils.log('WARNING', 'src/util/client.js', 'Logging in...');
            await super.login(token);
            this.utils.log('SUCCESS', 'src/util/client.js', `Logged in as ${this.user.tag}`);
        } catch (e) {
            this.utils.log('ERROR', 'src/util/client.js', `Error logging in: ${e}`);
            process.exit(1);
        }

        try {
            this.utils.log('WARNING', 'src/util/client.js', 'Loading commands...');
            await this.loadCommands();
            this.utils.log('SUCCESS', 'src/util/client.js', 'Loaded all commands!');
        } catch (e) {
            this.utils.log('ERROR', 'src/util/client.js', `Error loading commands: ${e}`);
        }

        return this.token;
    }
}

module.exports = HandlerClient;

/**
 * @param {Collection<string, import('../src/utils/command')>} collection 
 * @returns {import('discord.js').ApplicationCommandData[]} 
 */
function toApplicationCommand (collection) {
    return collection.map(s => { return { name: s.name, description: s.description, options: s.options, defaultPermission: s.devOnly ? false : s.defaultPermission } });
}