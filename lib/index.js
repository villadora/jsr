var util = require('util'),
    events = require('events'),
    EventEmitter = event.EventEmitter,
    _ = require('underscore');

module.exports.JXR = JXR;


function JXR(options) {
    EventEmitter.call(this);
    this.passes = {};
    this.isRunning = false;
    this.taskTimeout = 20*1000; // ms until the task fails
}

util.inherits(JXR, EventEmitter);

JXR.prototype.reset = function() {
    if(this.isRunning) this.stop();
    this.isRunning = false;
    this.passes = {};
};

JXR.prototype.add = function() {

};

JXR.prototype.task = function() {

};

JXR.prototype.hasTask = function() {

};

JXR.prototype.start = function() {

};

JXR.prototype.stop = function() {

};

JXR.prototype.isDone = function() {

};

JXR.prototype.sequence = require('senquencify');
