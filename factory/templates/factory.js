'use strict';

/**
 * @ngdoc service
 * @name <%= cameledName %>
 * @description
 * # <%= cameledName %>
 */

app.factory('<%= cameledName %>', function () {
    // Service logic

    var meaningOfLife = 42;

    // Public API here
    return {
        someMethod: function () {
            return meaningOfLife;
        }
    };
});