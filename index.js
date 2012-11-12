var server = require("./server");
var router = require("./router");
var cmdHandlers = require("./cmdHandlers");
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
