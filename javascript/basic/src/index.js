// @ts-check
const { Intents } = require('discord.js');
const Client = require('./utils/client');

const client = new Client({ 
    intents: Object.values(Intents.FLAGS),
    restTimeOffset: 0,
    allowedMentions: { parse: ['users'] }
});

(async () => {
    client.login(client.config.TOKEN);
})();