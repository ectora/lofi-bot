// const { stripIndents } = require('common-tags');
const Command = require('../../structures/handler/Command');

module.exports = class StopCommand extends Command {
      constructor(client, name) {
            super(client, name, {
                  aliases: [
                        'disconnect', 'stoplistening', 'stop-listening',
                        'leave', 'stopconnection'
                  ],
                  permissions: {
                        client: [
                              'USE_VAD', 'CONNECT', 'SPEAK',
                              'READ_MESSAGE_HISTORY'
                        ]
                  }
            });
      }

      /**
       * @param {import('discord.js').Message} message 
       * @param {String[]} args 
       */
      async run(message, args) {
            if (!message.member.voice.channel)
                  return message.channel.send({ content: "You are not connected to any voice channel." });

            const voiceChannel = message.guild.me.voice.channel;
            if (voiceChannel) {
                  if (message.member.voice.channelId !== voiceChannel.id)
                        return message.channel.send({ content: "You must be connected to the voice channel where the queue is present in." });

                  const player = this.client.music.players.get(message.guild.id);
                  if (!player) return voiceChannel. message.channel.send({ content: "No queue connection found in this server." });

                  player.destroy();
            } else {
                  return message.channel.send({ content: "No queue connection found in this server." });
            }
      }
}