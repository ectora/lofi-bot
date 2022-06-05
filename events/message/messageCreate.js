const Event = require('../../structures/handler/Event');

module.exports = class MessageCreateEvent extends Event {

	constructor(client, name) {
		super(client, name, {
			name: 'messageCreate',
		});
	}

      /**
       * @param {import('discord.js').Message} message
       */
	run(message) {
            if (message.author.bot) return;
            if (message.channel.type !== 'GUILD_TEXT') return;
            if (message.author.id === this.client.user.id) return;
            if (!message.content.startsWith(this.client.config.prefix)) return;
      
            const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
      
            const command = this.client.commands.get(cmd) ||
                  this.client.commands.get(this.client.aliases.get(cmd));

            if (!command) return;
            if (command.ownerOnly && !this.client.config.owners[message.author.id]) return;

            // check if bot has sufficient permission.
            if (command.clientPerms.length && !message.guild.me.permissions.has(command.clientPerms))
                  return message.channel.send(`Permissions missing: ${this.missingPerms(message.guild.me, command.clientPerms)}`);
      
            try {
                  if (typeof command.run === 'function') command.run(message, args);
                  else return;
            } catch (error) {
                  console.error(error);
                  return message.channel.send(`An error occurred while trying to run command.`);
            }
	}

      /**
       * 
       * @param {import('discord.js').GuildMember} member 
       * @param {import('discord.js').PermissionString[]} perms 
       * @returns 
       */
      missingPerms(member, perms) {
            const missingPerms = member.permissions.missing(perms)
                .map(str => this.permissions[str]);
        
            return missingPerms.length > 1 ?
                `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}` : 
                missingPerms[0];
      }

      get permissions() {
            return {
                  'CREATE_INSTANT_INVITE': 'Create Invite',
                  'KICK_MEMBERS': 'Kick Members',
                  'BAN_MEMBERS': 'Ban Members',
                  'ADMINISTRATOR': 'Administrator',
                  'MANAGE_CHANNELS': 'Manage Channels',
                  'MANAGE_GUILD': 'Manage Server',
                  'ADD_REACTIONS': 'Add Reactions',
                  'VIEW_AUDIT_LOG': 'View Audit Log',
                  'PRIORITY_SPEAKER': 'Priority Speaker',
                  'STREAM': 'Go Live',
                  'VIEW_CHANNEL': 'View Channels',
                  'SEND_MESSAGES': 'Send Messages',
                  'SEND_TTS_MESSAGES': 'Send Text-to-Speech Messages',
                  'MANAGE_MESSAGES': 'Manage Messages',
                  'EMBED_LINKS': 'Embed Links',
                  'ATTACH_FILES': 'Attach Files',
                  'READ_MESSAGE_HISTORY': 'Read Message History',
                  'MENTION_EVERYONE': 'Mention @everyone, @here, and All Roles',
                  'USE_EXTERNAL_EMOJIS': 'Use External Emoji',
                  'VIEW_GUILD_INSIGHTS': 'View Server Insights',
                  'CONNECT': 'Connect',
                  'SPEAK': 'Speak',
                  'MUTE_MEMBERS': 'Mute Members',
                  'DEAFEN_MEMBERS': 'Deafen Members',
                  'USE_VAD': 'Use Voice Activity',
                  'CHANGE_NICKNAME': 'Change Nickname',
                  'MANAGE_NICKNAMES': 'Manage Nicknames',
                  'MANAGE_ROLES': 'Manage Roles',
                  'MANAGE_WEBHOOKS': 'Manage Webhooks',
                  'MANAGE_EMOJIS_AND_STICKERS': 'Manage Emojis and Stickers',
                  'USE_APPLICATION_COMMANDS': 'Use Application Commands',
                  'REQUEST_TO_SPEAK': 'Request to Speak',
                  'MANAGE_THREADS': 'Manage Threads',
                  'USE_PUBLIC_THREADS': 'Use Public Threads',
                  'CREATE_PUBLIC_THREADS': 'Create Public Threads',
                  'USE_PRIVATE_THREADS': 'Use Private Threads',
                  'CREATE_PRIVATE_THREADS': 'Create Private Threads',
                  'USE_EXTERNAL_STICKERS': 'Use External Stickers',
                  'SEND_MESSAGES_IN_THREADS': 'Send Messages in Threads',
                  'START_EMBEDDED_ACTIVITIES': 'Start Activity',
                  'MODERATE_MEMBERS': 'Manage Members',
                  'MANAGE_EVENTS': 'Manage Events'
            };
      }
};