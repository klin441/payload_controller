
I2CQueue = require('./i2cqueue.js');

var queue1 = new I2CQueue(I2CQueue.BUS1);
var queue2 = new I2CQueue(I2CQueue.BUS2);

var printResult = function(error, stdout) {
    console.log('stdout: ', stdout);
}


console.log('=============testing sequential get/set==============');
queue1.set(0x00, 0x01, 0x02, printResult);
queue1.set(0x00, 0x01, 0x02, printResult);
queue1.set(0x00, 0x01, 0x02, printResult);
queue1.set(0x00, 0x01, 0x02, printResult);


setTimeout(function() {
    console.log('============testing two buses running concurrently =======');
    queue1.set(0x00, 0x01, 0x02, printResult);
    queue2.set(0x00, 0x01, 0x02, printResult);
    queue1.set(0x00, 0x01, 0x02, printResult);
    queue2.set(0x00, 0x01, 0x02, printResult);
}, 1000);



