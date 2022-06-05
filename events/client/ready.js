const Event = require('../../structures/handler/Event');

module.exports = class ReadyEvent extends Event {

	constructor(client, name) {
		super(client, name, {
			once: true
		});
	}

	run() {
		console.log(`Yo! The bot is online now!`);
		this.client.user.setPresence({ status: 'dnd' });
		this.client.music.start(this.client.user.id);
	}

};