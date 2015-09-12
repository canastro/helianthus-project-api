var express = require('express');
var router = express.Router();
var Category = require('../../models/category');

// on routes that end in /categories
// ----------------------------------------------------
router.route('/categories')

    // create a category (accessed at POST http://localhost:8080/api/categories)
    .post(function(req, res) {

        var category = new Category();      // create a new instance of the Category model
        category.name = req.body.name;  // set the categories name (comes from the request)

        // save the category and check for errors
        category.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Category created!' });
        });

    });

router.route('/categories/:category_id')
     // update the category with this id (accessed at PUT http://localhost:8080/api/categories/:category_id)
    .put(function(req, res) {

        // use our category model to find the category we want
        Category.findById(req.params.category_id, function(err, category) {

            if (err) {
                res.send(err);
            }

            category.name = req.body.name;  // update the categories info

            // save the category
            category.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Category updated!' });
            });

        });
    });

module.exports = router;
