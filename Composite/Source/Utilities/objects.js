﻿TC.Utils.arguments = function (args) {
    var byConstructor = {};
    $.each(args, function (index, arg) {
        byConstructor[arg.constructor] = arg;
    });

    return {
        byConstructor: function (constructor) {
            return byConstructor(constructor);
        },
        object: byConstructor[Object],
        string: byConstructor[String],
        'function': byConstructor[Function],
        array: byConstructor[Array],
        number: byConstructor[Number]
    };
};

TC.Utils.removeItem = function (array, item) {
    var index = $.inArray(item, array);
    if (index > -1)
        array.splice(index, 1);
};

TC.Utils.inheritOptions = function (from, to, options) {
    for (var i = 0, l = options.length; i < l; i++)
        to[options[i]] = from[options[i]];
    return to;
};

TC.Utils.evaluateProperty = function (target, property) {
    var properties = property.match(/[^\.]+/g);
    var result = target;

    if (properties) {
        for (var i = 0, l = properties.length; i < l; i++)
            if (properties[i])
                result = result[properties[i]];
    }
    return result;
};

TC.Utils.cloneData = function(from, except) {
    var result = {};
    for (var property in from) {
        var value = from[property];
        if (from.hasOwnProperty(property) &&
            (!except || Array.prototype.indexOf.call(arguments, property) === -1) &&
            (value.constructor !== Function || ko.isObservable(value)))
            
            result[property] = ko.utils.unwrapObservable(value);
    }
    return result;
};