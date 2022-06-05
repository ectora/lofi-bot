const Event = require('../../structures/handler/Event');

module.exports = class RawEvent extends Event {

	constructor(client, name) {
		super(client, name, {});
	}

	run(data) {
            this.client.music.handleVoiceUpdate(data);
	}

};