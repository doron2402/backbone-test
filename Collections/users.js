define(function (require) {
    var Backbone = require('backbone');
    // Collections
    A.Collections.Users = Backbone.Collection.extend({
        url: '/users'
    });
});
