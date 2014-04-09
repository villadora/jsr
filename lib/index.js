var ext = require('./ext'),
    util = require('util'),
    events = require('events'),
    EventEmitter = event.EventEmitter,
    pass = require('./pass'),
    PassManager = pass.PassManager,
    _ = require('underscore');

module.exports.JSSCompiler = JSSCompiler;


function JSSCompiler(options) {
    EventEmitter.call(this);

    this.passMgr = new PassManager(_.pick(options, 'passes'));
}

util.inherits(JSSCompiler, EventEmitter);

_.extend(JSSCompiler.prototype, {
    run: function() {

    }
});