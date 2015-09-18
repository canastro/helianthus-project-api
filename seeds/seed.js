var Q = require('q');
var mongoose = require('mongoose');
var config = require('../config'); // get our config file

//get our models
var CategoryModel = require('../app/models/category');
var TagModel = require('../app/models/tag');
var UserModel = require('../app/models/user');
var SetupModel = require('../app/models/setup');
var PhotoModel = require('../app/models/photo');

//get our seeds
var categories = require('./data/categories');
var tags = require('./data/tags');
var users = require('./data/users');
var setups = require('./data/setups');
var photos = require('./data/photos');

mongoose.connect(config.database); // connect to database


function dropCollection(collection) {

    var deferred = Q.defer();

    mongoose.connection.collections[collection].drop(function (err) {
        deferred.resolve();
    });

    return deferred.promise;
}

function init() {

    var collections = ['categories', 'tags', 'users', 'setups', 'photos'];
    var promises = [];

    collections.forEach(function (collection) {
        console.log('DROPPING: ', collection);
        promises.push(dropCollection(collection));
    });

    return Q.all(promises);
}

function seedCategories() {

    var promises = [];

    console.log('-----------------------------------------------');
    console.log('CREATE CATEGORIES');
    console.log('-----------------------------------------------');
    categories.forEach(function (category) {
        promises.push(
            CategoryModel.create(category, function (err, item) {
                console.log(err, item);
            })
        );
    });

    return Q.all(promises);
}

function seedTags() {

    var promises = [];

    console.log('-----------------------------------------------');
    console.log('CREATE TAGS');
    console.log('-----------------------------------------------');
    tags.forEach(function (tag) {
        promises.push(
            TagModel.create(tag, function (err, item) {
                console.log(err, item);
            })
        );
    });

    return Q.all(promises);
}

function seedUsers() {

    var promises = [];

    console.log('-----------------------------------------------');
    console.log('CREATE USERS');
    console.log('-----------------------------------------------');
    users.forEach(function (user) {
        promises.push(
            UserModel.create(user, function (err, item) {
                console.log(err, item);
            })
        );
    });

    return promises;
}

function seedSetups() {

    var promises = [];

    console.log('-----------------------------------------------');
    console.log('CREATE SETUPS');
    console.log('-----------------------------------------------');
    setups.forEach(function (setup) {
        promises.push(
            SetupModel.create(setup, function (err, item) {
                console.log(err, item);
            })
        );
    });

    return Q.all(promises);
}

function seedPhotos() {

    console.log('-----------------------------------------------');
    console.log('CREATE PHOTOS');
    console.log('-----------------------------------------------');

    photos.forEach(function (photo) {

        var promises = [];

        promises.push(
            CategoryModel.findOne(photo.category).exec()
        );

        photo.tags.forEach(function (item) {
            promises.push(
                TagModel.findOne(item).exec()
            );
        });

        promises.push(
            SetupModel.findOne(photo.setup).exec()
        );

        Q.all(promises)
            .then(function (result) {

                photo.category = result[0];
                photo.tags = [result[1], result[2]];
                photo.setup = result[3];

                PhotoModel.create(photo, function (err, item) {
                    console.log(err, item);
                });
            })
            .catch(function () {
                console.log(arguments);
            });
    });
}

init()
    .then(seedCategories)
    .then(seedTags)
    .then(seedUsers)
    .then(seedSetups)
    .then(seedPhotos)
