var estraverse = require('estraverse'),
esprima = require('esprima'),
escodegen = require('escodegen'),
Syntax = estraverse.Syntax,
escope = require('escope'),
_ = require('underscore'),
assert = require('assert')
;


var mangled_name = '__$replace$__';


function constants_resolve(ast, options) {
    var scope_manager = escope.analyze(ast), scopes = scope_manager.scopes;
    options = options || {};
    scope_manager.attach();
    
    // built link between ref <=> var
    _.chain(scopes).map(function(scope) { return scope.variables; }).flatten().each(function(v){
        _.each(v.references, function(ref){
            ref.identifier.__var = v;
        });
        
        _.each(v.defs, function(def) {
            switch(def.type) {
            case "ImplicitGlobalVariable":
                console.warn("Has implicitGlobalVariable: %s in line: %s, column: %s", def.name.name, def.node.loc.start.line, def.node.loc.start.column);
                break;
            case 'Variable':
            case 'FunctionName':
            case 'Parameter':
            case 'CatchClause':
                def.name.__def = true;
                break;
            default:
                console.warn("Unhanlded case: %s", def.type);
            }
        });
    });

    var global = scopes[0];

    console.log(global.variables.length);
    var undeclared = _.chain(global.through).map(function(ref) {
        return ref.identifier.name;
    }).uniq().value();
    
    _.chain(global.variables).map(function(e) {return e.identifiers;}).flatten().map(function(id) { return id.name;}).each(function(variable) {
        var idx = undeclared.indexOf(variable);
        if(idx !== -1)
            undeclared.splice(idx,1);
    });
    
    estraverse.traverse(ast, {
        enter: function(node) {
            if(node.type === Syntax.VariableDeclarator) {
                if(!node.init) return;
                var str = escodegen.generate(node.init);
                if(str in options) {
                    _.each(node.id.__var.references, function(ref){
                        assert.ok(ref.identifier.type == Syntax.Identifier);
                        if(!ref.identifier.__def)
                            ref.identifier[mangled_name] = options[str];
                    });

                }else {
                    switch(node.init.type) {
                    case Syntax.Identifier:
                        if(undeclared.indexOf(node.init.name) != -1) {
                            _.each(node.id.__var.references, function(ref) {
                                assert.ok(ref.identifier.type == Syntax.Identifier);
                                if(!ref.identifier.__def)
                                    ref.identifier[mangled_name] = {type: Syntax.Identifier, name: node.init.name};
                            });
                        }
                        break;
                    case Syntax.Literal:
                        break;
                    default:
                    }
                }
            }
        }
    });


    estraverse.replace(ast, {
        enter: function(node) {
            if(node.hasOwnProperty(mangled_name)) {
                return node[mangled_name];
            }
        }
    });
    scope_manager.detach();
    return ast;
}


module.exports = constants_resolve;
