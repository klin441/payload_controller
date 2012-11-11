var sys = require('sys');
var events = require('events');
var exec = require("child_process").exec;

function Backend() {
    if(false === (this instandof Backend)) {
        return new Backend();
    }
    event.eventEmitter.call(this);
}
sys.inherits(Backend, events.EventEmitter);


Backend.prototype.i2cSet = function(channel, device_addr, reg_addr, buffer) {
    var self = this;
    exec("echo lol; sleep 2", function(error, stdout, stderr) {
        self.emit('i2cSetComplete');
    });
}

Backend.prototype.i2cGet = function(channel, device_addr, reg_addr, buffer) {
    var self = this;
    exec("ls -l; sleep 5", function(error, stdout, stderr) {
        buffer = stdout;
        self.emit('i2cGetComplete');
    });
}

module.exports = Backend;

/*************************************************/

var backend = new Backend();

// dummy camera handler
var cameraHandler = function(backend, command_detail) {
    // dummy command code of 0 for take 1 photo, store to sd card
    if (command_detail == 0) {  // must get rid of ugly if-else structure later
        
    }
}

backend.on('i2cSetComplete', function() {
    console.log('i2c set complete');
});

backend.on('i2cGetComplete', function() {
    console.log('i2c get complete');
});

backend.i2cSet(


/*
// backend controller to communicate with peripheral hardware

var events = require('events');
var eventEmitter = new events.EventEmitter();

var queue = '';

eventEmitter.on('someEvent', function(message, message2) {
    console.log(message);
    console.log(message2);
});

eventEmitter.on('addToQueue', function(data) {
    queue = queue + data;
    console.log('queue is ' + queue);
});

//eventEmitter.emit('someEvent', 'this is a message', 'this is 2nd message');
eventEmitter.emit('addToQueue', '1st message');
eventEmitter.emit('addToQueue', '2nd message');

*/