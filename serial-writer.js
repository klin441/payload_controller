var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var exec = require('child_process').exec;


var stdin = process.openStdin();

exec('echo 1 > /sys/kernel/debug/omap_mux/spi0_sclk', function() {
    exec('echo 21 > /sys/kernel/debug/omap_mux/spi0_d0', function() {
        var sp = new SerialPort("/dev/ttyO2", {
            parser: serialport.parsers.raw,
			baudrate: 9600,
		});
        
        stdin.on('data', function(chunk) { 
            console.log("Got chunk: " + chunk);
            sp.write(chunk+"\n");
        });
        
        sp.on("data", function (data) {
		    sys.puts("here: "+data);
		});
    });
});

