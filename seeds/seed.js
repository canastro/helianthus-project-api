var Q = require('q');
var mongoose = require('mongoose');
var config = require('../config'); // get our config file
var argv = require('yargs').argv;

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

function clearDatabase() {

    var collections = ['categories', 'tags', 'users', 'setups', 'photos'];
    var promises = [];

    collections.forEach(function (collection) {
        //console.log('DROPPING: ', collection);
        promises.push(dropCollection(collection));
    });

    return Q.all(promises);
}


function createCategory(category) {
    var deferred = Q.defer();

    CategoryModel.create(category, function (err, item) {
        deferred.resolve();
    });

    return deferred.promise;
}

function seedCategories() {

    var promises = [];

    //console.log('-----------------------------------------------');
    //console.log('CREATE CATEGORIES');
    //console.log('-----------------------------------------------');
    categories.forEach(function (category) {
        promises.push(createCategory(category));
    });

    return Q.all(promises);
}

function createTag(tag) {
    var deferred = Q.defer();

    TagModel.create(tag, function (err, item) {
        deferred.resolve();
    });

    return deferred.promise;
}

function seedTags() {

    var promises = [];

    //console.log('-----------------------------------------------');
    //console.log('CREATE TAGS');
    //console.log('-----------------------------------------------');
    tags.forEach(function (tag) {
        promises.push(createTag(tag));
    });

    return Q.all(promises);
}

function createUser(user) {
    var deferred = Q.defer();

    UserModel.create(user, function (err, item) {
        deferred.resolve();
    });

    return deferred.promise;
}

function seedUsers() {

    var promises = [];

    //console.log('-----------------------------------------------');
    //console.log('CREATE USERS');
    //console.log('-----------------------------------------------');
    users.forEach(function (user) {
        promises.push(createUser(user));
    });

    return promises;
}

function createSetup(setup) {
    var deferred = Q.defer();

    SetupModel.create(setup, function (err, item) {
        deferred.resolve();
    });

    return deferred.promise;
}

function seedSetups() {

    var promises = [];

    //console.log('-----------------------------------------------');
    //console.log('CREATE SETUPS');
    //console.log('-----------------------------------------------');
    setups.forEach(function (setup) {
        promises.push(createSetup(setup));
    });

    return Q.all(promises);
}

function seedPhotos() {

    //console.log('-----------------------------------------------');
    //console.log('CREATE PHOTOS');
    //console.log('-----------------------------------------------');

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

                console.log(arguments);

                PhotoModel.create(photo, function (err, item) {
                    //console.log(err, item);
                });
            })
            .catch(function () {
                //console.log(arguments);
            });
    });
}

if (argv.clear) {
    clearDatabase();
} else {
    seedCategories()
        .then(seedTags)
        .then(seedUsers)
        .then(seedSetups)
        .then(seedPhotos)
}
