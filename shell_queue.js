var sys = require('sys');
var events = require('events');
var exec = require("child_process").exec;


// each added task gives ShellQueue one response listener

function ShellQueue() {
    var self = this;
    
    self.queue = [];		// a queue of shell tasks
    self.isIdle = 1;			// allows for the required blocking execution
}
sys.inherits(ShellQueue, events.EventEmitter);

// change to callbacks instead of listeners

ShellQueue.prototype.add = function(shell_cmd_string, response) {
    var self = this;
    var object = {};
    object.cmd = shell_cmd_string;
    object.response = response;
    
    self.queue.push(object);
    if (self.isIdle) {
        self.isIdle = 0;
        self._execute();
    }    
}

// an internal function.
ShellQueue.prototype._execute = function() {
    var self = this;
    var object = self.queue.shift();
    // want blocking execution on the same queue 
    //console.log('about to _execute ' + object.cmd);
    exec(object.cmd, function(error, stdout, stderr) {
        
        // tell outside world one task just completed
        object.response.emit('complete', stdout, error, object.cmd);
                
        // keep processing the queue
        if (self.queue.length > 0) {
            self._execute();
        } else {
            // put queue into an idle state
            self.isIdle = 1;
        }
    });
}



module.exports = ShellQueue;

