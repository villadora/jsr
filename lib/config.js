module.exports = {
    pipeline: {
        /* constants that will replaced */
        "constants": {
            "void 0": {type:'Identifier', name:'undefined'},
            "null": {type:'Literal', value:null},
            "true":{type:'Literal', value:true},
            "!0": {type:'Literal', value:true},
            "false":{type:'Literal', value:false},
            "!1": {type:'Literal', value:false},
            "Infinity":{type:'Identifier', name:'Infinity'}
        },
        "reverse_manglings": {
        },
        /* the name of functions that try to inline */
        "inline_functions": [
        ]
    }
};
