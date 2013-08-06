var analyses = require('analyses'),
estraverse = require('estraverse'),
esgraph = require('esgraph'),
_ = require('underscore')
;

function typecheck(ast, options) {
    var cfg = esgraph(ast);

    var dfa = analyses(cfg, function (input, list) {
//        this; // the cfg node
//        input; // the input set
//        list; // the worklist `.push()` nodes to it.
        
       // return new analyses.Set(); // either return a new output Set
        // or return an output Set and `enqueue: false` so the worklist algorithm does
        // not check and enqueue successors itself.
        return {output: new analyses.Set(), enqueue: false};
    }, {
        // direction:
        // forward or backward; defaults to forward
        direction: 'forward',
        // custom merge function:
        // typically union or intersect; defaults to union
        merge: analyses.Set.union,
        // custom equals function:
        // this is used to determine if the output of a node still changes and to
        // not enqueue any more successors and stop the iteration; defaults to
        // Set.equals
        equals: analyses.Set.equals
    });

    return ast;
}

module.exports = typecheck;
