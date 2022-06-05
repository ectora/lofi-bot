/* eslint-disable no-unused-vars */
module.exports = class {

      /**
       * 
       * @param {import('../RadioClient')} client * @param {String} name 
       * @param {CommandOptions} options 
       */
	constructor(client, name, options = {}) {
		this.client = client;
		this.name = name;

		this.aliases = options.aliases || [];
		this.category = options.category || 'miscellaneous';
		this.description = options.description || 'No description found.';

		this.usage = options.usage || 'No usage provided.';
		this.ownerOnly = options.ownerOnly || false;
		this.bucket = options.bucket || 3;

		this.cooldown = options.cooldown || 3e4;
		this.args = options.args || [];

            if (options.permissions) {
                  this.clientPerms = options.permissions.client || ['EMBED_LINKS'];
                  this.userPerms = options.permissions.user || [];
            }
            
		this.clientPerms = ['EMBED_LINKS'];
		this.userPerms = [];
	}

	async run(message, args) {
		throw new Error(`This command doesn't provide a run method.`);
	}

	/**
	 * What the client will run when the commands get loaded into the client.
	 * @returns {void}
	 */
	async init() {
	      return;
	}

};

/**
 * @typedef {Object} CommandOptions
 * @property {String[]} aliases - Command aliases.
 * @property {String} category - Command categorization.
 * @property {String} description - How the command works. Returns a placeholder value if none is found.
 * @property {String} usage - How the command can be used. Returns a placeholder value if none is found.
 * @property {Boolean} ownerOnly - A boolean to see if the command can only be used by an admin, default is false (anyone can use the command)
 * @property {Number} bucket - How many times the command can be ran, default is 3 times.
 * @property {Number} cooldown - How long is the cooldown for the command, default is 30 seconds.
 * @property {Argument[]} args - What arguments are required for the command to run.
 * 
 * @property {Object} permissions - No definition atm, but for permission checks.
 * @property {import('discord.js').PermissionString[]} permissions.client - What permission does the bot need to run the command effortlessly.
 * @property {import('discord.js').PermissionString[]} permissions.user - What permission does the user need to run the command effortlessly.
 */

/**
 * @typedef {Object} Argument
 * @property {String} name - What is the name of the argument.
 * @property {Boolean} required - To see if the argument is required.
 */