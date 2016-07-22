var convict = require('convict');
const path = require('path');
const validator = require('validator');

// https://github.com/mozilla/node-convict/issues/93
// allow mongo-uri validation
convict.addFormat({
    name: 'mongo-uri',
    validate: function(val) {
        if (!validator.isURL(val, {
                protocols: ['mongodb']
            })) {
            throw new Error('must be a MongoDB URI');
        }
    }
});

var conf = convict({
    uri: {
        doc: 'Mongo URI',
        format: 'mongo-uri',
        default: ''
    }
});

// Define a schema
var conf = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    express: {
        ip: {
            doc: "The IP address to bind.",
            format: "ipaddress",
            default: "127.0.0.1",
            env: "IP_ADDRESS",
        },
        port: {
            doc: "The port to bind.",
            format: "port",
            default: 3000,
            env: "EXPRESS_PORT"
        }
    },

    mongo: {
        main: {
            doc: "Database host name/IP",
            format: 'mongo-uri',
            default: 'mongodb://127.0.0.1:27017/my-database',
            env: "MONGO_MAIN"
        }
    }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile(path.join(__dirname, './env/' + env + '.json'));

// Perform validation
conf.validate({
    strict: true
});

module.exports = conf;
