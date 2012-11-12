var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var exec = require('child_process').exec;


var stdin = process.openStdin();

exec('echo 21 > /sys/kernel/debug/omap_mux/spi0_sclk', function() {
    exec('echo 1 > /sys/kernel/debug/omap_mux/spi0_d0', function() {
        console.log('using ttyO2');
        var sp = new SerialPort("/dev/ttyO2", {
//exec('echo 0 > /sys/kernel/debug/omap_mux/uart1_txd', function() {
//    exec('echo 20 > /sys/kernel/debug/omap_mux/uart1_rxd', function() {
//        console.log('using ttyO1');
//        var sp = new SerialPort('/dev/ttyO1', {

            parser: serialport.parsers.readline("\n"),
			baudrate: 9600,
		});
        
        stdin.on('data', function(chunk) { 
            console.log("writing chunk: " + chunk);
            sp.write(chunk);
        });
        
        /*
        setInterval(function() {
            console.log('wrot hello');
            sp.write("hello\n");
        }, 1000);
        */
        
        
        sp.on("data", function (data) {
		    console.log("here: "+data);
		});
    });
});

