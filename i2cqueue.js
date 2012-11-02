var ShellQueue = require('./shellqueue.js');
var util = require('util');
var sys = require('sys');

// oops must inherit from shell queue. change to callbacks instead of listeners

function I2CQueue(bus) {
    var self = this;
    I2CQueue.super_.call(self, bus);		// call superclass's constructor
    
    self.bus = bus;
    
    if (bus > 3 || bus < 1) {
        console.error('invalid bus', bus);
    }
}
// inherit the add(shellString, callback) function of ShellQueue
sys.inherits(I2CQueue, ShellQueue);

I2CQueue.BUS1 = 1;
I2CQueue.BUS2 = 2;
I2CQueue.BUS3 = 3;

// need to fix num_bytes
I2CQueue.prototype.get = function(chipAddr, regAddr, numBytes, callback ) {
    console.log('i2c get called');
    var self = this;
    //var shellString = util.format('echo i2cget %d %d %d', self.bus, chipAddr, regAddr);
    var shellString = util.format('echo %d', chipAddr);
    self.addTask(shellString, function onGetComplete(error, stdout) {
        if (typeof callback == 'function') {
            if (error) return callback(error);
            callback(error, parseInt(stdout, 16));
        }
    });
}

I2CQueue.prototype.set = function(chipAddr, regAddr, byteValue, callback) {
    console.log('i2c set called');
    var self = this;
    var shellString = util.format('echo i2cset %d %d %d', self.bus, chipAddr, byteValue);
    self.addTask(shellString, function onSetComplete(error, stdout) {
        if (typeof callback == 'function') {
            callback(error, stdout)
        }
    });
}

module.exports = I2CQueue;
