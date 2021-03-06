var exec = require("child_process").exec;

// object constructor
function ShellQueue(name) {
    var self = this;
    self.name = name; 		// for debugging 
    self.queue = [];		// a queue of shell tasks
    self.isIdle = true;		// allows for the required blocking execution
}


ShellQueue.prototype.addTask = function(shellCmdString, callback) {
    var self = this;
    var task = {};
    task.cmd = shellCmdString;
    task.callback = callback;
    
    self.queue.push(task);
    if (self.isIdle) {
        self.isIdle = false;
        self._execute();
    }    
    
    console.log('new task added to queue', self.name);
}

// an internal function.
ShellQueue.prototype._execute = function() {
    var self = this;
    var task = self.queue.shift();
    // want blocking execution on the same queue 
    //console.log('about to _execute ' + task.cmd, 'of queue', self.name);
    exec(task.cmd, function(error, stdout, stderr) {
        
        // if has error, throw error but continue 
        if (error) return callback(error);
        
        if (task.callback) {
            task.callback(error, stdout, stderr, task.cmd);
        }
        
        // keep processing the queue
        if (self.queue.length > 0) {
            self._execute();
        } else {
            // put queue into an idle state
            self.isIdle = true;
            console.log('queue', self.name, 'is idle', Date());
        }
    });
}



module.exports = ShellQueue;

