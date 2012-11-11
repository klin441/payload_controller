var server = require("./server");
var router = require("./router");
var cmdHandlers = require("./cmdHandlers");
var I2CQueue = require('./i2cqueue'); // for the BUS constants

var cmdInfos = {};
cmdInfos['0x0000'] = {
	'handler'	: cmdHandlers.takePhoto,
	'bus'		: I2CQueue.BUS3,
};

var cscUartPort = server.UART2;


server.start(router.route, cmdInfos, cscUartPort);
