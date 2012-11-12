ShellQueue = require('./shellqueue');
I2CQueue = require('./i2cqueue');

var queues = {};
queues[I2CQueue.BUS1] = new I2CQueue(I2CQueue.BUS1); 
queues[I2CQueue.BUS2] = new I2CQueue(I2CQueue.BUS2); 
queues[I2CQueue.BUS3] = new I2CQueue(I2CQueue.BUS3); 

/*    
    I2CQueue.BUS1: new I2CQueue(I2CQueue.BUS1),
    I2CQueue.BUS2: new I2CQueue(I2CQueue.BUS2),
};*/

function route(cmdRequest, cmdSpecs) {
  console.log("About to route a request for: " + cmdRequest);
  
  var cmdHandler = cmdSpecs[cmdRequest].handler;
  var cmdBus = cmdSpecs[cmdRequest].bus
  
  if (typeof cmdHandler == 'function') {
    cmdHandler(queues[cmdBus]);
  } else {
    return new Error('No handler for ' + cmdRequest);
    console.error('No handler for ' + cmdRequest);
  }
}

exports.route = route;