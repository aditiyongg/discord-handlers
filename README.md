# About

Welcome, this is a powerful set of handlers available for [discord.js v13](https://www.npmjs.com/package/discord.js "https://www.npmjs.com/package/discord.js"). The aim of these handlers are to allow developers to skip the tedious process of having to create a handler for their project(s). The process of doing this is redundant and takes unecessary time. This package also includes a [`JavaScript`](javascript) & [`TypeScript`](typescript) versions of the handlers. With that in mind, the handlers offer:

- Easy set up - everything is documented.
- Basic handler without mongo & advanced handler with mongo.
- Very performant & clean code.
- 100% coverage of the Discord API.

## Installation

**Node.js 16.6.0 & npm 7.0.0 or newer is required.**  

```sh-session
npm install -y
```

## Usage
__**Configuration:**__
1. Go to the `src/config` folder.
2. Input the respective config options.
3. Add your Discord User ID in the `DEVS` array.
4. Add your Support/Test Server ID in the `DEV_SERVERS` array.
5. Optional: Add your own emotes in the `EMOTES` object.
6. Optional: Add your MongoDB URI. This step is only needed if you are not using the basic handler(s).

__**Adding a command:**__
- *JavaScript:*
```js
// @ts-check
const Command = require('../../utils/command');

module.exports = class Template extends Command {
    constructor (client) {
        super(client, {
            name: 'template',
            description: 'This is a template'
        });
    }

    /**
     * @param {object} p
     * @param {import('../../utils/client')} p.client
     * @param {import('discord.js').CommandInteraction} p.interaction
     */
    async execute ({ client, interaction }) {
        // 
    }
}
```
```js
// @ts-check
const Command = require('../../utils/command');

module.exports = class TemplateSubCommands extends Command {
    constructor (client) {
        super(client, {
            name: 'template_with_sub_commands',
            description: 'This is a template with sub commands!',
            subcommands: {
                command1: {
                    description: 'The description for the first sub command.',
                    
                    /**
                     * @param {object} p
                     * @param {import('../../utils/client')} p.client
                     * @param {import('discord.js').CommandInteraction} p.interaction
                     */
                    execute: async ({ client, interaction }) => {
                        //
                    }
                },
                command2: {
                    description: 'The description for the first sub command.',
                    
                    /**
                     * @param {object} p
                     * @param {import('../../utils/client')} p.client
                     * @param {import('discord.js').CommandInteraction} p.interaction
                     */
                     execute: async ({ client, interaction }) => {
                        //
                    }
                }
            }
        });
    }
}
```
1. Create your new command file, ending in the `.js` extension.
2. Change the class name from "Template" to your command name.
3. Change the command name to your new command name.
4. Add a useful description for your new command.
5. Voila! You can now add any new options.
6. If you would like your command registered as a global command, set `development` to `false`.

- *TypeScript:*
```ts
import { CommandInteraction } from 'discord.js';
import { Command } from '../../utils/command';
import { Client } from '../../utils/client';

export default class Template extends Command {
    constructor (client: Client) {
        super(client, {
            name: 'template',
            description: 'This is a template'
        });
    }

    async execute ({ client, interaction, group, subcommand }: { client: Client, interaction: CommandInteraction, group: string, subcommand: string }) {
        // 
    }
}
```
```ts
import { CommandInteraction } from 'discord.js';
import { Command } from '../../utils/command';
import { Client } from '../../utils/client';

export default class Template extends Command {
    constructor (client: Client) {
        super(client, {
            name: 'template',
            description: 'This is a template',
            subcommands: {
                command1: {
                    description: 'The description for the first sub command.',
                    
                    execute: async ({ client, interaction }: { client: Client, interaction: CommandInteraction }) => {
                        //
                    }
                },
                command2: {
                    description: 'The description for the first sub command.',
                    
                    execute: async ({ client, interaction }: { client: Client, interaction: CommandInteraction }) => {
                        //
                    }
                }
            }
        });
    }
}
```
1. Create your new command file, ending in the `.ts` extension.
2. Change the class name from "Template" to your command name.
3. Change the command name to your new command name.
4. Add a useful description for your new command.
5. Voila! You can now add any new options.
6. If you would like your command registered as a global command, set `development` to `false`.

__**Adding an event:**__
- *JavaScript:*
```js
// @ts-check
/**
 * event name here
 * @param {import('../../utils/client')} client
 */
module.exports = async (client) => {
    //
};
```
1. Create your new event file, ending in the `.js` extension. **The file name needs to be the event name!**
2. Add the necessary jsdoc parameters for intellisense.
3. Add the necessary parameters.
5. Voila! Your event is now added!

- *TypeScript:*
```ts
import { Client } from '../../utils/client';

export default async (client: Client): Promise<void> => {
    //
};
```
1. Create your new event file, ending in the `.ts` extension. **The file name needs to be the event name!**
3. Add the necessary parameters.
5. Voila! Your event is now added!

## Credits
- [Canta's bot-prefab-package](https://npmjs.org/package/bot-prefab-package "https://npmjs.org/package/bot-prefab-package")