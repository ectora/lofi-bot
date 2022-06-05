const Command = require('../../structures/handler/Command');
const { stripIndents } = require('common-tags');

module.exports = class PingCommand extends Command {
      constructor(client, name) {
            super(client, name, {
                  aliases: ['latency', 'pong']
            });
      }

      /**
       * 
       * @param {import('discord.js').Message} message 
       * @param {String[]} args 
       */
      async run(message, args) {
            const milliseconds = Date.now();
            const ping = await message.channel.send('Ping?');

            return ping.edit(stripIndents(`
                  🏓  Pong!
                  RTT: \`${ping.createdTimestamp - message.createdTimestamp}ms\`
                  Client: \`${Date.now() - milliseconds}ms\`
                  Gateway: \`${Math.round(this.client.ws.ping)}ms\`
            `));
      }
}