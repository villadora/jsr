var pipelines = require('./pipeline'),
esprima = require('esprima'),
_ = require('underscore')
;


_.mixin({
  deepClone : function(obj) {
      function __deepClone(source, target) {
            var key, val;
            for (key in source) {
                if (key.lastIndexOf('__', 0) === 0) {
                    // escape internal property
                    continue;
                }

                if (source.hasOwnProperty(key)) {
                    val = source[key];
                    if (typeof val === 'object' && val !== null) {
                        if (val instanceof RegExp) {
                            val = new RegExp(val);
                        } else {
                            val = __deepClone(val, _.isArray(val) ? [] : {});
                        }
                    }
                    target[key] = val;
                }
            }
            return target;
        }

        return __deepClone(obj, _.isArray(obj) ? [] : {});
  }
});




var jss = {
    compile: function(ast, passes, options) {
        if(_.isString(ast)) 
            ast = esprima.parse(ast, {range:true, loc:true});

        var passes = passes || [], 
            configs = options.configs || {};
        ast = pipelines.run(
            ast, 
            _.map(passes, function(pass) {
                if(_.isFunction(pass))
                    return { fn: pass, opts: {} };
                else if(_.isObject(pass))
                    return { name: pass.name, fn: pass.fn, opts: pass.opts };
                else
                    return { name:name, opts: configs[name] };
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
    register: function(name, pass) {
        pipelines.add(name, pass);
    }
};


module.exports = {
    jss: jss,
    bin: require('./bin.js')
};

