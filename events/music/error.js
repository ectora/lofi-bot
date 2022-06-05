const Event = require('../../structures/handler/Event');

module.exports = class ErrorEvent extends Event {

	constructor(client, name) {
		super(client, name, {
                  name: 'error',
                  emitter: 'music'
		});
	}

      /**
       * @param {import('vulkava').Node} node 
       * @param {Error} error
       */
	run(node, error) {
            console.log(`[Music]: Error from Node ${node.identifier} (${error.name}: ${error.message})`);
	}

};