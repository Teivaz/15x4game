var ReactDispatcher = require('react-flux-dispatcher');

var system_events = {
	logger: new ReactDispatcher(),
	time: new ReactDispatcher(),
	player: new ReactDispatcher()
};
