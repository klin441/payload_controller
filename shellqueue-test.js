var events = require('events');
var ShellQueue = require('./shellqueue');

var myQueue = new ShellQueue('1');
var myQueue2 = new ShellQueue('2');

var printResult = function(error, stdout, stderr, cmd) {
    console.log('completed - ', Date(), 'stdout: ' + stdout + 'cmd: ' + cmd, "\n");
}

console.log("===========Testing tasks can be added to queue================");
console.log(Date());
myQueue.addTask('echo lol', printResult);
myQueue.addTask('echo cool', printResult);
myQueue.addTask('echo still awake?', printResult); 
myQueue.addTask('echo 1 >> ./tmp', printResult);
myQueue.addTask('echo 2 >> ./tmp', printResult);
setTimeout(function() {
	console.log("===========Testing blocking nature of individual queue========");
    console.log(Date());
	myQueue.addTask('echo 1st queue 1; sleep 1', printResult);
	myQueue.addTask('echo 1st queue 2; sleep 1', printResult);
	myQueue.addTask('echo 1st queue 3; sleep 1', printResult);
	
	setTimeout(function() {
		console.log("===========Testing concurrency of seperate queues=============");
		console.log(Date());
		myQueue.addTask('echo 1st queue 1; sleep 1', printResult);
		myQueue.addTask('echo 1st queue 2; sleep 1', printResult);
		myQueue.addTask('echo 1st queue 3; sleep 1', printResult);
		
		myQueue2.addTask('echo 2nd queue 1; sleep 1', printResult);
		myQueue2.addTask('echo 2nd queue 2; sleep 1', printResult);
		myQueue2.addTask('echo 2nd queue 3; sleep 1', printResult);
		myQueue2.addTask('echo 2nd queue 4; sleep 1', printResult);
		myQueue2.addTask('echo 2nd queue 5; sleep 1', printResult);
	}, 5000);
}, 1000);
