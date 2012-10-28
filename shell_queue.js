var sys = require('sys');
var events = require('events');
var exec = require("child_process").exec;


function ShellQueue(name) {
    var self = this;
    self.name = name; 		// for debugging 
    self.queue = [];		// a queue of shell tasks
    self.isIdle = 1;		// allows for the required blocking execution
}
sys.inherits(ShellQueue, events.EventEmitter);

// change to callbacks instead of listeners

ShellQueue.prototype.add = function(shell_cmd_string, callback) {
    var self = this;
    var task = {};
    task.cmd = shell_cmd_string;
    task.callback = callback;
    
    self.queue.push(task);
    if (self.isIdle) {
        self.isIdle = 0;
        self._execute();
    }    
    
    console.log('new task added');
}

// an internal function.
ShellQueue.prototype._execute = function() {
    var self = this;
    var task = self.queue.shift();
    // want blocking execution on the same queue 
    //console.log('about to _execute ' + task.cmd);
    exec(task.cmd, function(error, stdout, stderr) {
        
        if (task.callback) {
            task.callback(error, stdout, stderr, task.cmd);
        }
        
        // keep processing the queue
        if (self.queue.length > 0) {
            self._execute();
        } else {
            // put queue into an idle state
            self.isIdle = 1;
            console.log('queue', self.name, 'is idle');
        }
    });
}



module.exports = ShellQueue;

