var events = require('events');
var ShellQueue = require('./shell_queue');

var myQueue = new ShellQueue();
var myQueue2 = new ShellQueue();

var response = new events.EventEmitter();
var response2 = new events.EventEmitter();

myQueue.add('echo lol', response);
myQueue.add('echo cool', response);
myQueue.add('sleep 5', response);
myQueue.add('echo still awake?', response); 
myQueue.add('echo 1 >> ./tmp', response);
myQueue.add('echo 2 >> ./tmp', response);

myQueue2.add('echo 2nd queue 1; sleep 1', response2);
myQueue2.add('echo 2nd queue 2; sleep 1', response2);
myQueue2.add('echo 2nd queue 3; sleep 1', response2);



setTimeout(function() {
    myQueue.add('echo adding to queue after timeout', response);
}, 5000);


// change listeners to one time only 

response.on('complete', function(stdout, error) {
    console.log('complete event raised - stdout: ' + stdout);
});

response2.on('complete', function(stdout, error) {
    console.log('2nd queue complete even raised - stdout: ' + stdout);
});