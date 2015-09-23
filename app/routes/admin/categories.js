var express = require('express');
var router = express.Router();
var Category = require('../../models/category');

var mongoose = require('mongoose');
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

// on routes that end in /categories
// ----------------------------------------------------
router.route('/categories')

    // create a category (accessed at POST http://localhost:8080/api/categories)
    .post(function(req, res) {

        var category = new Category();      // create a new instance of the Category model
        category.name = req.body.name;  // set the categories name (comes from the request)

        // save the category and check for errors
        Promise.resolve(category.save())
            .then(function () {
                res.status(201).json({
                    message: 'Category created!'
                });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });
    });

router.route('/categories/:category_id')
     // update the category with this id (accessed at PUT http://localhost:8080/api/categories/:category_id)
    .put(function(req, res) {

        // use our category model to find the category we want
        Promise.resolve(Category.findById(req.params.category_id).exec())
            .then(function (category) {

                if (!category) {
                    return res.status(404).json({
                        err: 'Category not found'
                    });
                }

                // update the categories info
                category.name = req.body.name;

                return category.save();
            })
            .then(function () {
                res.status(200).json({ message: 'Category updated!' });
            })
            .catch(function (err) {
                res.status(500).json({
                    err: err
                });
            });
    });

module.exports = router;
