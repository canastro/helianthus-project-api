var express = require('express');
var router = express.Router();
var Category = require('../models/category');

// on routes that end in /categories
// ----------------------------------------------------
router.route('/categories')

    // get all the categories (accessed at GET http://localhost:8080/api/categories)
    .get(function(req, res) {
        Category.find(function(err, categories) {
            if (err) {
                res.send(err);
            }

            res.json(categories);
        });
    });


// on routes that end in /categories/:category_id
// ----------------------------------------------------
router.route('/categories/:category_id')

    // get the category with that id (accessed at GET http://localhost:8080/api/categories/:category_id)
    .get(function(req, res) {
        Category.findById(req.params.category_id, function(err, category) {
            if (err) {
                res.send(err);
            }

            res.json(category);
        });
    });


module.exports = router;
