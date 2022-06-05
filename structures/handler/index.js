const path = require('path');
const Util = require('../util/');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const Command = require('./Command');
const Event = require('./Event');
const fs = require('fs');

module.exports = class {

      /**
       * @constructor
       * @param {import('../RadioClient')} client 
       */
      constructor(client) {
            this.client = client;
      }

      get directory() {
            return `${path.dirname(require.main.filename)}${path.sep}`;
      }

      async loadCommands() {
            const categories = fs.readdirSync(path.resolve(this.directory, 'commands'));
            if (categories.length < 1) throw new TypeError(`No command categories were found.`);

            for (const category of categories) {
                  const commands =
                        fs.readdirSync(path.resolve(this.directory, 'commands', category));
                  if (commands.length < 1) throw new TypeError(`No commands were found.`);

                  for (const commandName of commands) {
                        const command = path.resolve(this.directory, 'commands', category, commandName);
                        delete require.cache[require.resolve(command)];
                        const { name } = path.parse(command);
                        const File = require(command);

                        if (!Util.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
                        const cmd = new File(this.client, name.toLowerCase());
                        if (!(cmd instanceof Command)) throw new TypeError(`The command ${name} isn't an instance of Command.`);
                        this.client.commands.set(cmd.name, cmd);
                        if (cmd.aliases.length) {
                              for (const alias of cmd.aliases) {
                                    this.client.aliases.set(alias, cmd.name);
                              }
                        }
                  }
            }
      }

      async loadEvents() {
            const categories = fs.readdirSync(path.resolve(this.directory, 'events'));
            if (categories.length < 1) throw new TypeError(`No event categories were found.`);

            for (const category of categories) {
                  const events =
                        fs.readdirSync(path.resolve(this.directory, 'events', category));
                  if (events.length < 1) throw new TypeError(`No events were found.`);

                  for (const eventName of events) {
                        const eventFile = path.resolve(this.directory, 'events', category, eventName);
                        delete require.cache[require.resolve(eventFile)];
                        const { name } = path.parse(eventFile);
                        const File = require(eventFile);
				if (!Util.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class.`);

				const event = new File(this.client, name.toLowerCase());
				if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in the Events directory.`);

				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
                  }
            }
      }
}