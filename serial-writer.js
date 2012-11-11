var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var exec = require('child_process').exec;


var baudrate = 9600;

sp = new SerialPort("/dev/ttyO2", {
    parser: serialport.parsers.readline("\n"),
    baudrate: baudrate,
});

var stdin = process.openStdin();

exec('echo 1 > /sys/kernel/debug/omap_mux/spi0_sclk', function() {
    exec('echo 21 >/sys/kernel/debug/omap_mux/spi0_d0', function() {
        stdin.on('data', function(chunk) { 
            console.log("Got chunk: " + chunk);
            sp.write(chunk);
        });
    });
});

