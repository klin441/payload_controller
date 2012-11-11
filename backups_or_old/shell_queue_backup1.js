var sys = require('sys');
var events = require('events');
var exec = require("child_process").exec;


// each added task gives ShellQueue one response listener

function ShellQueue() {
    var self = this;
    
    self.queue = [];		// a queue of shell tasks
    self.isIdle = 1;			// allows for the required blocking execution
    
    // Listener: when new task is added, check if queue is currently been 
    //    processed. If not, restart processing the queue
    self.on('newTaskAdded', function() {
        console.log('newTaskAdded event raised, queue: ', self.queue);
        if (self.isIdle) {
            self.isIdel = 0;
            self.execute();
            //console.log('Processing started');
        } else {
            //console.log('already processing stuff');
        }
    });
    
    // Listener: when a task completes, check for any more tasks on queue to process.
    //     if so, process them. Else puts ShellQueue into idle state
    self.on('taskComplete', function(cmd) {
        console.log('task complete: ', cmd, 'queue: ', self.queue);
        if (self.queue.length > 0) {
            console.log('still more tasks in queue, keep processing');
            self.execute();
        } else {
            self.isIdle = 1;
            console.log('no more tasks to execute, module idle');
        }
    })
}
sys.inherits(ShellQueue, events.EventEmitter);


ShellQueue.prototype.add = function(shell_cmd_string, response) {
    var self = this;
    var object = {};
    object.cmd = shell_cmd_string;
    object.response = response;
    
    self.queue.push(object);
    self.emit('newTaskAdded');
    
}

// self looping function that takes care of itself
ShellQueue.prototype.execute = function() {
    var self = this;
    var object = this.queue.shift();
    console.log('shifted: ', object);
    // want blocking execution on the same queue 
    //console.log('about to execute ' + object.cmd);
    exec(object.cmd, function(error, stdout, stderr) {
        //console.log('cmd is ' + object.cmd);
        //console.log('stdout is ' + stdout);
        object.response.emit('complete', stdout, error);
        self.emit('taskComplete', object.cmd);
    });
}



module.exports = ShellQueue;

