var _ = require('underscore');


_.mixin({
    deepClone: function(obj) {
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