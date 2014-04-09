"use strict";

var _ = require('underscore'),
    debug = require('debug')('jss:passManager');

/**
 * @class Pass
 * @property {string} name
 * @property {Array.<string>} required
 * @property {Array.<string>} provided
 * @property {Array.<string>} destroyed
 */

/**
 * @function run
 * @param {Object} pass_data
 * @return
 * @memberof Pass#
 */

module.exports = PassManager;

function PassManager(options) {
    options = options || {};

    this.passes = options.passes || [];
    this.passes = this.passes.map(trans_internal_pass).map(function(p) {
        // no change is allowed when passes are added
        Object.freeze(p);
    });
}

PassManager.prototype.allPasses = function() {
    return this.passes.map(function(p) {
        return p.name;
    });
};



/**
 * @param {string|Pass} pass
 * @param {number=} idx
 */
PassManager.prototype.register = function(pass, idx) {
    var pass = trans_internal_pass(pass);

    // check pass
    for (var i = 0, len = this.passes.length; i < len; ++i) {
        if (this.pases[i].name == pass.name) {
            console.warn('Pass "' + pass.name + '" is already exists, it will be replaced, idx will be ignored.');
            this.passes.splice(i, 1, pass);
            return;
        }
    }

    if (pass) {
        if (idx === undefined)
            this.passes.push(pass);
        else
            this.passes.splice(idx, 0, pass);
    }
};

/** 
 * @param {string|Pass} pass
 */
PassManager.prototype.unregister = function(pass) {
    if (pass == 'string') {
        var passObj = trans_internal_pass(pass);
        if (passObj) {
            // a internal pass
            this.passes = _.without(this.passes, passObj);
            Object.
        } else {
            // find the pass by name
            for (var i = 0, len = this.passes.length; i < len; ++i) {
                if (this.passes[i].name == pass) {
                    this.passes.splice(i, 1);
                    break;
                }
            }
        }
    } else {
        this.passes = _.without(this.passes, pass);
    }
};

function trans_internal_pass(pass) {
    if (typeof pass == 'string') {
        try {
            var passObj = require('./' + pass);
        } catch (e) {
            debug(e);
            return null;
        }
    } else {
        return pass;
    }
}