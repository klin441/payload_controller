payload_controller
==================

node js project for beaglebone
still very early in its development


Design Concept:


	index.js 
		import cmdHandler functions, router function, server function, and I2C constants
		associate bus and handlers to defined command strings, put these specs into an object called 'cmdSpecs')
		
	|  pass arguments: uart port number connected to CSC, commandSpecs, router function
	v
	
	server.js (listens to UART port for command strings from CSC, then pass commands to router)
	
	| pass arguments: command string, cmdSpecs
	v
	
	router.js (initiates I2C buses from userdefined module. for the given command string, look up the required handler and i2c bus number from cmdSpecs. Execute the handler on the specified bus)
	
	| pass argument: i2c bus object
	v
	
	command handler function (executes whatever you like with the i2cBus object) 