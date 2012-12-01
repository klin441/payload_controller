var server = require("./server");     
var router = require("./router");     // router function to be passed to the server ("dependency injection")
var cmdHandlers = require("./cmdHandlers");  // import a collection of handler functions to be associated with commands
var I2CQueue = require('./i2cqueue'); // for the BUS constants

var cmdSpecs = Object.create(null);   // create a 'clean' object with no default attributes such as .prototype etc
cmdSpecs["takePhoto"] = {
	'handler'	: cmdHandlers.takePhoto,
	'bus'		: I2CQueue.BUS3,
};

cmdSpecs["clearPollsBus3"] = {
    'handler'	: cmdHandlers.clearPolls,
    'bus'		: I2CQueue.BUS3,
};

var cscUartPort = server.UART1;


server.start(router.route, cmdSpecs, cscUartPort);
