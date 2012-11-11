var ShellQueue = require('./shellqueue.js');
var util = require('util');

function I2CQueue(bus) {
    var self = this;
    self.shellQueue = new ShellQueue(bus);
    self.bus = bus;
    
    if (bus > 3 || bus < 1) { throw new Error('invalid bus: ', bus) };
}

I2CQueue.BUS1 = 1;
I2CQueue.BUS2 = 2;
I2CQueue.BUS3 = 3;

// need to fix num_bytes
I2CQueue.prototype.get = function(chipAddr, regAddr, numBytes, callback ) {
    //console.log('i2c get called');
    var self = this;
    //var shellString = util.format('echo i2cget %d %d %d', self.bus, chipAddr, regAddr);
    var shellString = util.format('echo %d', chipAddr);
    self.shellQueue.addTask(shellString, function onGetComplete(error, stdout) {
        if (error) return callback(error);
        if (typeof callback == 'function') {
            callback(error, parseInt(stdout, 16));
        }
    });
}

I2CQueue.prototype.set = function(chipAddr, regAddr, byteValue, callback) {
    //console.log('i2c set called');
    var self = this;
    var shellString = util.format('echo i2cset %d %d %d', self.bus, chipAddr, byteValue);
    self.shellQueue.addTask(shellString, function onSetComplete(error, stdout) {
        if (error) return callback(error);
        if (typeof callback == 'function') {
            callback(error, stdout)
        }
    });
}

module.exports = I2CQueue;
