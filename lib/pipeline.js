var _ = require('underscore');

var piplines = module.exports = {
    // inner passes
    __passes__: {},
    /** run throught whole pass **/
    run:  function(ast, passes) {
        var self = this, bltPss = self.__passes__;

        passes = passes.map(function(def) {
            var p, opts, name;
            if(def.fn && _.isFunction(def.fn)) {
                name = elm.name;
                p = elm.fn;
                opts = elm.options;
            }else if(!(def.name in pss)) {
                throw new Error('Can not find pass ' + elm.name);
            }

            name = name || def.name || "anonymouse pass";
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
        if(passes.hasOwnProperty(name)) {
            console.warn('"%s" is already exists, it will be replaced');
        }
        passes[name] = { fn: pass };
    }
};


//==================
// Build-in Passes
//==================

