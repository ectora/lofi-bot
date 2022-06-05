const Event = require('../../structures/handler/Event');

module.exports = class NodeConnectEvent extends Event {

	constructor(client, name) {
		super(client, name, {
                  name: 'nodeConnect',
                  emitter: 'music'
		});
	}

      /**
       * @param {import('vulkava').Node} node 
       */
	run(node) {
            console.log(`[Music]: Succesfully connected to Node ${node.identifier}`);
	}

};