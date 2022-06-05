/* eslint-disable no-unused-vars */
module.exports = class {

	/**
	 * 
	 * @param {import('../RadioClient')} client * @param {String} name 
	 * @param {{ name: String, once: Boolean, emitter: String }} options 
	 */
	constructor(client, name, options = {
            name: '',
            once: false,
            emitter: ''
      }) {
		this.client = client;

		this.name = options.name || name;
		this.type = options.once ? 'once' : 'on';
		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}

	async run(...args) {
	      throw new Error(`The run method wasn't implemented in Event ${this.name}`);
	}

};