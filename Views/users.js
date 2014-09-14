define(function (require) {
    var $ = require('jquery')
    var _ = require('underscore');
    var Backbone = require('backbone');

    A.Views.Users = Backbone.View.extend({
        el: '.page',
        events: {
            "scroll": "scroll",
        },
        scroll: function(){
            console.log( "scrolling..." );
        },
        initialize: function() {
            console.log('init..');
        },
        render: function () {
            var self = this;
            var usersCollection = new A.Collections.Users();
            usersCollection.fetch({
                success: function(users) {
                    var temp = _.template($('#users-list-template').html());
                    temp = temp({users: users.models});
                    self.$el.html(temp);
                },
                error: function(err) {
                    console.log('err');
                }
            });

        }
    });

    A.Views.UsersEdit = A.Views.Users.extend({
        templateDiv: '#users-edit-temlpate',
        user_id: null,
        events: {
            'submit .edit-user-form': 'saveUser',
            'click #btn-delete-user': 'delUser'
        },
        delUser: function(ev) {
            ev.preventDefault();
            console.log(this.userModel);
            this.userModel.destroy({
                success: function() {
                    router.navigate('users', {trigger: true});
                }
            })
        },
        saveUser: function(ev) {
            var self = this;
            ev.preventDefault();
            var userDetail = $(ev.currentTarget).serializeObject();

            self.userModel = new A.Models.User();
            self.userModel.save(userDetail, {
                success: function(user) {
                    router.navigate('users', {trigger: true});
                }
            });
        },
        render: function(args) {
            if (args && args.user_id) {
                this.user_id = args.user_id;
                this.userModel = new A.Models.User({id: this.user_id});
                this.renderEditUserForm();
            } else {
                this.renderNewUserForm();
            }

        },
        renderNewUserForm: function() {
            var self = this;
            var temp = _.template($(self.templateDiv).html());
            temp = temp({user: null});
            self.$el.html(temp);
        },
        renderEditUserForm: function() {
            var self = this;

            var temp = _.template($(self.templateDiv).html());
            self.userModel.fetch({
                success: function(user) {
                    temp = temp({user: user});
                    self.$el.html(temp);
                }
            });
        }
     });

    A.Views.Pages = Backbone.View.extend({
        el: '.page',
        page: 'home',
        template: '#pages-template',
        header: null,
        body: null,
        render: function(args) {
            var self = this;
            if (args.page) {
                self.page = args.page;
            }
            var template = _.template($(self.template).html());
            template = template(self.getPageContent(self.page));
            self.$el.html(template);
        },
        getPageContent: function(page) {
            var obj = {};
            switch(page) {
                case 'about':
                    obj = {
                        header: 'About Page',
                        body: 'this is about page...'
                    };
                    break;
                default:
                    obj = {
                        header: 'Home Page',
                        body: 'bla bla....home page...'
                    };
                    break;
            }
            return obj;
        }
    });

});