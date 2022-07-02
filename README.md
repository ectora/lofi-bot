# lofi-bot
Play Lo-fi with a bot for your server. Uses Lavalink for stability and improved performance. \
[*You can also use this with Volcano, which is a Lavalink clone but rewritten in TypeScript.*](https://github.com/AmandaDiscord/Volcano/) \
Icecast or SHOUTcast streams work fine, except for when it requires authentication or stream gets interrupted.

## Installation and setup
1. Install all dependencies. *How will it work if you don't? It can't*
2. Find a local [Lavalink host here](https://lavalink.darrennathanael.com/) or make one your own effortlessly using [Lavalink-on-Replit](https://github.com/kajise/lavalink-replit)
   - You can host one via your own VPS, just find tutorials on youtube on how to how your own lavalink server.
3. Add your Lavalink Node Info in the `config.json` file.
4. Set your Bot Token in the `.env` file.
5. And you're done. Run the command `node .` and the bot should be up.

Available commands: `listen, stop, volume, ping` \
Tip: You can replace the YouTube URL of the livestream in the `Listen.js` file.
