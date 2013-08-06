var _ = require('underscore');

var piplines = module.exports = {
    __passes__: {},
    /** run throught whole pass **/
    run:  function(ast, passes) {
        var self = this, pss = self.__passes__;

        passes = passes.map(function(elm) {
            var p, opts, name;
            if(elm.fn && _.isFunction(elm.fn)) {
                name = elm.name;
                p = elm.fn;
                opts = elm.options;
            }else if(!(elm.name in pss)) {
                throw new Error('Can not find pass ' + elm.name);
            }

            name = name || elm.name || "anonymouse pass";
            p = p || pss[elm.name];
            opts = opts || elm.options || {};
            if(!_.isFunction(p)) 
                throw new Error("Pass should be function: [" + name + "]");
            
            return { 
                pass: p,
                options: opts
            };
        });

        var data = {
            ast : ast
        };
        
        while(passes.length > 0) {
            var p = passes.shift();
            data = p.pass(data, p.options) || data;
        }

        if('ast' in data) return data.ast;

        return ast;
    },

    add: function(name, pass) {
        var passes = this.__passes__;
        if(name in passes) {
            console.warn('"%s" is already exists, it will be replaced');
        }

        passes[name] = pass;
    }
};
