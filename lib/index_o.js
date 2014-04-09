var pipelines = require('./pipeline'),
  esprima = require('esprima'),
  escodegen = require('escodegen'),
  ext = require('./ext'),
  _ = require('underscore');


var jss = {
  parse: function(code) {
    return esprima.parse(code, {
      range: true,
      loc: true
    });
  },
  generate: function(ast, opts) {
    return escodegen.generate(ast, {
      format: {},
      directive: true
    });
  },
  compile: function(code, options) {
    var ast;
    options = options || {};
    if (_.isString(code))
      ast = this.parse(code);
    else
      ast = code;

    var passes = options.passes || [];

    ast = pipelines.run(
      ast,
      // define pass API
      _.map(passes, function(pass) {
        if (_.isFunction(pass))
          return {
            fn: pass,
            opts: {}
          };
        else if (_.isObject(pass))
          return {
            name: pass.name,
            fn: pass.fn,
            opts: pass.opts
          };
        else if (_.isString(pass))
          return {
            name: pass
          };
        return {};
      })
    );

    return ast;
  },
  /**
   * THe pass is a function that accept a object data with:
   *  {
   *    ast: {...},
   *    scope: {...},
   *    defuse: {...}
   *  }
   *
   * return a Object with handled
   *
   * @param {string} name
   * @param {function(data:Object, options:Object):Object
   */
  registerPass: function(name, pass) {
    pipelines.add(name, pass);
  }
};


module.exports = {
  jss: jss,
  bin: require('./bin.js')
};