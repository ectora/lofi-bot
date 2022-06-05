const Event = require('../../structures/handler/Event');

module.exports = class NodeDisconnectEvent extends Event {

	constructor(client, name) {
		super(client, name, {
                  name: 'nodeDisconnect',
                  emitter: 'music'
		});
	}

      /**
       * @param {import('vulkava').Node} node 
       * @param {number} code * @param {String} reason
       */
	run(node, code, reason) {
            console.log(`[Music]: Disconnected from Node ${node.identifier} (${code}: ${reason})`);
	}

};