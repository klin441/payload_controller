

function takePhoto(i2cQueue) {
    var regs = {
		chipAddr: 0x1e,  // dummy
		statusReg: 0x48,   // dummy
		completeStatus: 47,
		dataReg: 0x10,    // dummy
		numDataBytes: 10, 
		controlReg: 0x00,  // dummy
		controlByte: 0x00, // dummy
    };
    var pollInterval_s = 2 // in seconds
    
    i2cQueue.set(regs.chipAddr, regs.controlReg, regs.controlByte, function(error, stdout) {
       if (error) {console.error('i2c ', i2cQueue.name, ' set failed', error)};
    });
    
    // polling required to check if device finished taking the photo
    
    _pollDevice(i2cQueue, regs, pollInterval_s, function onReady(error) {
        // get the ready data
        i2cQueue.get(regs.chipAddr, regs.dataReg, regs.numDataBytes, function onData(error, buffer) {
            // do something with data
            console.log('photo data received');
        });
    });
}

// still working on it.... dont worry about this one...
// remove the polling intervals on a given i2cQueue
function clearPolls(i2cQueue) {
    console.log('in clear polls for bus: '+i2cQueue.getBusNumber());
    console.log('current active interval ids: ', Object.keys(_pollIds));
    for (var intervalId in _pollIds) {
        if (_pollIds[intervalId] === i2cQueue.getBusNumber()) {
            console.log('clear hit');
            clearInterval(intervalId);
            delete _pollIds[intervalId];
        }
    }
}

exports.takePhoto = takePhoto;
exports.clearPolls = clearPolls;


/*******************************Internal functions*************************/

// still working on it......

// need a 'clean' internal object hash to keep track of active polling operations
// hash key is the bus number, hash value is an array of timerobjects(ie intervalId objects)
var _pollIds = Object.create(null);
_pollIds[I2CQueue.BUS1] = [];
_pollIds[I2CQueue.BUS2] = [];
_pollIds[I2CQueue.BUS3] = [];



// internal housekeeping function for polling devices at set interval 
function _pollDevice(i2cQueue, regs, interval_s, callback) {
    var intervalId = setInterval(function onTimeout(error) {
        _poll(i2cQueue, regs, intervalId, function(error){
            if (error) return callback(error);
            callback(error);
            delete _pollIds[intervalId];  // remove hash entry after polling completed
        });
    }, interval_s*1000);
    _pollIds[intervalId] = i2cQueue.getBusNumber();  // create 'hash-entry' for key=intervalId, value=i2cbusnumber
}

// poll device via i2cget; check for required statusReg; remove intervalID if ready and calls callback
var _poll = function (i2cQueue, regs, intervalId, callback){
	console.log('polling i2cbus ', i2cQueue.bus, 'chip ', regs.chipAddr);
	i2cQueue.get(regs.chipAddr, regs.statusReg, 1, function(error, buffer) {
		if(buffer == regs.completeStatus) {
		    if (error) return callback(error);
			callback(error); // execute callback which then go gets the ready data
			clearInterval(intervalId); // removal interval execution of _poll
		} else {
			console.log('incorrect reg status got: ', buffer," ;expect: ", regs.completeStatus, 'data not ready yet');
		}
	});
}




//------some quick tests-----
//var I2C_Queue = require('./i2cqueue');
//var i2c_1 = new I2C_Queue(I2C_Queue.BUS1);
//takePhoto(i2c_1);
