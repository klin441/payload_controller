/*	usage:
	var I2CQueue = require('path-to-file');       // import constructor
	var myI2cQueue = new I2CQueue(I2CQueue.BUS1); // create new i2cQueue
	myI2cQueue.get(chipAddr, regAddr, numBytes, callback) // where chipAddr, regAddr, numBytes are byte-range integers
	myI2cQueue.set(chipAddr, regAddr, byteValue, callback) // where chipAddr, regAddr, byteValue are all byte-range integers
	myI2cQueue.getBusNumber() // returns integer of the bus number
*/

var ShellQueue = require('./shellqueue.js');
var util = require('util');

function I2CQueue(bus) {
    var self = this;
    self.shellQueue = new ShellQueue(bus);
    self.bus = bus;
    
    if (bus > 3 || bus < 1) { throw new Error('invalid bus: ', bus) };
    console.log("i2cqueue bus: ", bus, " is created");
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

I2CQueue.prototype.getBusNumber = function() {
    var self = this;
    return self.bus;
}

module.exports = I2CQueue;
