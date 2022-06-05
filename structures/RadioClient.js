const { Client, Collection } = require('discord.js');
const ApricotHandler = require('./handler');
const { Vulkava } = require('vulkava');

module.exports = class RadioClient extends Client {

      constructor(config) {
            super({
                  allowedMentions: { users: [], repliedUser: false },
                  intents: [
                        'GUILDS', 'GUILD_MESSAGES',
                        'GUILD_MEMBERS', 'GUILD_VOICE_STATES',
                        'GUILD_PRESENCES'
                  ]
            });
            
            this.validate(config);
            this.events = new Collection();
            /** @type {Collection<string, string>} */
            this.aliases = new Collection();
            /** @type {Collection<string, import('./handler/Command')>} */
            this.commands = new Collection();
            this.handler = new ApricotHandler(this);
            this.music = new Vulkava({
                  nodes: config.nodes,
                  sendWS: (guildId, payload) => {
                        const guild = this.guilds.cache.get(guildId);
                        if (guild) guild.shard.send(payload);
                  }
            });
      }

      validate(config) {
            if (typeof config !== 'object') throw new TypeError(`The config must be a valid object.`);
            if (!config.token) throw new TypeError(`The token field is missing.`);
            if (typeof config.token !== 'string') throw new TypeError(`The token must be a string.`);

            if (!config.prefix) throw new TypeError(`The prefix field is missing.`);
            if (typeof config.prefix !== 'string') throw new TypeError(`The prefix must be a string.`);

            if (!config.nodes) throw new TypeError(`The nodes field is missing.`);
            if (!Array.isArray(config.nodes)) throw new TypeError(`The nodes field must be an array of nodes.`);
            if (config.nodes.length < 1) throw new TypeError(`The nodes field is empty.`);

            this.config = config;
      }

	resolveUser(user) {
            return this.users.cache.get(user) || this.users.resolve(user);
	}

	async connect(token = this.config.token) {
            this.handler.loadEvents();
            this.handler.loadCommands();
		super.login(token);
	}

};