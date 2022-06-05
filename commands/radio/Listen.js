// const { stripIndents } = require('common-tags');
const Command = require('../../structures/handler/Command');

module.exports = class ListenCommand extends Command {
      constructor(client, name) {
            super(client, name, {
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

            // replace your url here
            // + sources supported (youtube, soundcloud)
            const res = await this.client.music.search('https://www.youtube.com/watch?v=5qap5aO4i9A');

            if (res.loadType === "LOAD_FAILED") {
                  return message.reply(`:x: Load failed. Error: ${res.exception.message}`);
            } else if (res.loadType === "NO_MATCHES") {
                  return message.reply(':x: No track was found with your query!');
            }

            // Creates the audio player
            const player = this.client.music.createPlayer({
                  guildId: message.guild.id,
                  voiceChannelId: message.member.voice.channelId,
                  textChannelId: message.channel.id,
                  selfDeaf: true
            });
            
            if (player.current) {
                  return message.reply('The livestream is already playing.');
            } else {
                  const track = res.tracks[0];
                  track.setRequester(message.author);

                  player.queue.push(track);
                  player.connect(); // Connects to the voice channel if not in.
                  if (!player.playing) player.play();
            }
      }
}