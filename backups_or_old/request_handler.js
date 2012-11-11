var events = require('events');
var I2C_Bus = require('./i2c_bus.js');



function RequestHandler() {
    var self = this;
    
    // initiates the independant bus queues
    self.i2c_1 = new I2C_Bus(1);
    self.i2c_2 = new I2C_Bus(2);
    self.i2c_3 = new I2C_Bus(3);
    
    self.handle = {
        'command1': self.handler1,
        'commnad2': self.handler2,
    };
}
sys.inherits(RequestHandler, events.EventEmitter);


// public function
RequestHandler.prototype.handle = function(cmd) {
    if (typeof self.handle[cmd] == 'function') {
        self.handle[cmd]();
    } else {
        // throw error
    }
}

RequestHandler.prototype.handler1 = function() {
    

}