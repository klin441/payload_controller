var fs = require('fs');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
  


function start(route, handle, cscUart) {
    
    // set pinmux and create a serialport for csc uart port
    _setUartPinmux(cscUart);
    var cscUartPort = new SerialPort("/dev/ttyO"+cscUart, { 
        parser: serialport.parsers.readline("\n") 
    });

	cscUartPort.on("data", function cscOnData(data) {
	    console.log("cscUartPort received: ", data);
	});
	
	console.log("Server has started.");
}

exports.start = start;
exports.UART1 = "1";
exports.UART2 = "2";
exports.UART3 = "3";
exports.UART4 = "4";
exports.UART5 = "5";

/******************Internal objects and functions**************/

_setUartPinmux = function(uartport) {

    // create a file write stream to set pinmux black magic for the uart ports
    var filestream = fs.createWriteStream(_UART_PINMUX[uartport+'RX']["path"]);
    filestream.end(_UART_PINMUX[uartport+'RX']["value"]);
    filestream.destroy();
    
    filestream = fs.createWriteStream(_UART_PINMUX[uartport+'TX']["path"]);
    filestream.end(_UART_PINMUX[uartport+'TX']["value"]);
    filestream.destroy();
}


_UART_PINMUX = {
	"1RX": {
       "path": "/sys/kernel/debug/omap_mux/uart1_rxd",
       "value": 20
    },
    "1TX": {
       "path": "/sys/kernel/debug/omap_mux/uart1_txd",
       "value": 0
    },
    "2RX": {
       "path": "/sys/kernel/debug/omap_mux/spi0_sclk",
       "value": 1
    },
    "2TX": {
       "path": "/sys/kernel/debug/omap_mux/spi0_d0",
       "value": 21
    },
    "4RX": {
       "path": "/sys/kernel/debug/omap_mux/gpmc_wait0",
       "value": 26
    },
    "4TX": {
       "path": "/sys/kernel/debug/omap_mux/gpmc_wpn",
       "value": 6
    },
    "5RX": {
       "path": "/sys/kernel/debug/omap_mux/lcd_data9",
       "value": 24
    },
    "5TX": {
       "path": "/sys/kernel/debug/omap_mux/lcd_data8",
       "value": 4
    }
};