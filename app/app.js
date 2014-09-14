define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var backbone = require('backbone');
    //Configuration
    window.A = {
        Views: {},
        Router: {},
        Controllers: {},
        Models: {},
        Collections: {},
        Config: {
            url: 'http://backbonejs-beginner.herokuapp.com'
        }
    };

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        options.url = A.Config.url + options.url;
    });

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});