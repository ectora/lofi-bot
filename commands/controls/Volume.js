// const { stripIndents } = require('common-tags');
const Command = require('../../structures/handler/Command');

module.exports = class VolumeCommand extends Command {
      constructor(client, name) {
            super(client, name, {
                  aliases: [
                        'setvolume', 'changevolume'
                  ],
                  args: [
                        {
                              name: 'Volume',
                              required: true
                        }
                  ],
                  usage: '<volume[0-100]>',
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
            
            if (!args[0]) return message.channel.send({ content: "Volume value must be present." });
            const volume = parseInt(args[0].replace('%', ''));
            if (isNaN(volume)) return message.channel.send({ content: "Volume value must be a number." });
            if (volume > 100) return message.channel.send({ content: "Volume is over the allowed limit `(100%)`." });

            const voiceChannel = message.guild.me.voice.channel;
            if (voiceChannel) {
                  if (message.member.voice.channelId !== voiceChannel.id)
                        return message.channel.send({ content: "You must be connected to the voice channel where the queue is present in." });

                  const player = this.client.music.players.get(message.guild.id);
                  if (!player) return voiceChannel. message.channel.send({ content: "No queue connection found in this server." });

                  player.filters.setVolume(volume);
                  return message.channel.send(`Volume has been set to \`${volume}%\`.`);
            } else {
                  return message.channel.send({ content: "No queue connection found in this server." });
            }
      }
}