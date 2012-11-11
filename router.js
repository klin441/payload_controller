ShellQueue = require('./shellqueue');
I2CQueue = require('./i2cqueue');

var shellQueue = ShellQueue(Date());

function route(cmdRequest, cmdInfos) {
  console.log("About to route a request for " + cmdRequest);
  
  var handler = cmdInfos[cmdRequest].handler;
  var bus = cmdInfos[cmdRequest].bus
  
  if (typeof handler == 'function') {
    handler(bus);
  } else {
    console.log('No handler for ' + cmdRequest);
  }
}

exports.route = route;