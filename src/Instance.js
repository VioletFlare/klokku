const K = require('./commands/K.js');

class Instance {
    onMessageCreate(msg) {
        const command = msg.content.toLowerCase();

        if (command === "k") {
            K.run(msg);
        }
    }

    init() {
        
    }
}

module.exports = Instance;