/*
    Author: Bullet_Tide.
    Note: Please refrain from editing in this file.
          Any changes made in this file could be
          overwritten upon pulling any commits from
          the main repo.
*/

import { Guild, Interaction } from 'discord.js';
import { Client } from '../src/utils/client';

async function guildCreate (client: Client, guild: Guild) {
    try {
        if (guild.available) {
            const channel = client.utils.getDefaultChannel(guild);
            if (!channel) return;
    
            await channel.send('Thanks for adding me! For a list of commands, use `/help`!');
        }
    } catch (e) {
        client.utils.log('ERROR', 'src/events/guild/guildCreate.js', e);
    }
}

async function interactionCreate (client: Client, interaction: Interaction) {
    try {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            if (!client.config.DEVS.includes(interaction.user.id)) {
                if (command.guildOnly) {
                    const channel = await interaction.guild.channels.fetch(interaction.channel.id);
                    const member = await interaction.guild.members.fetch(interaction.user.id);

                    if (!interaction.inGuild()) return;

                    if (command.ownerOnly && interaction.guild.ownerId !== interaction.user.id) return await client.utils.quickError(interaction, 'This command can only be used by the server owner.');

                    if (command.clientPerms && !channel.permissionsFor(interaction.guild.me).has(command.clientPerms, true)) return await client.utils.quickError(interaction, `I am missing the following permissions: ${client.utils.missingPermissions(interaction.guild.me, command.clientPerms)}.`);

                    if (command.perms && !member.permissions.has(command.perms, true)) return await client.utils.quickError(interaction, `You are missing the following permissions: ${client.utils.missingPermissions(member, command.perms)}.`);

                    if (command.nsfw && !channel.isVoice() && channel.type !== 'GUILD_CATEGORY' &&!channel.nsfw) return await client.utils.quickError(interaction, 'This command can only be used in a NSFW channel.')
                }
            }

            const group = interaction.options.getSubcommandGroup(false);
            const subcommand = interaction.options.getSubcommand(false);

            try {
                if (command.groups || command.subcommands) {
                    const sub = command.groups ? command.groups[group].subcommands[subcommand]
                                                      : command.subcommands[subcommand];

                    if (sub.execute) return await sub.execute({ client, interaction, group, subcommand });
                }

                // @ts-ignore
                await command.execute({ client, interaction, group, subcommand });
            } catch (e) {
                client.utils.log('ERROR', 'src/events/interaction/interactionCreate.js', `Error running command '${command.name}'`);
            }
        }
    } catch (e) {
        client.utils.log('ERROR', 'src/events/interaction/interactionCreate.js', e);
    }
}

export {
    guildCreate,
    interactionCreate
}