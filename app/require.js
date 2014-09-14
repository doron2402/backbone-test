requirejs.config({
    paths: {
        app: 'app',
        jquery: '../vendors/jquery/dist/jquery.min',
        underscore: '../vendors/underscore/underscore-min',
        backbone: '../vendors/backbone/backbone',
        routes: 'routes',
        UsersViews: '../Views/users',
        UsersCollection: '../Collections/users',
        UserModel: '../Models/user'
    }
});

requirejs(['app']);