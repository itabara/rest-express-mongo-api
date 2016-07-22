var expressValidator = require('express-validator');
var configuration = require('../config/configuration');
var util = require('util');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("bson-objectid");

var Product = require('../models/product');

exports.addProduct = function(req, res) {
    // validation
    req.checkBody('productName', 'Invalid productName').notEmpty();
    req.checkBody('price', 'Invalid price').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

    var product = new Product();

    product.productName = req.body.productName;
    product.productType = req.body.productType;
    product.price = req.body.price;

    MongoClient.connect(configuration.get('mongo.main'), function(err, db) {
        // get the collection
        var products = db.collection('products');
        products.insertOne(product).then(function(result) {
            res.status(200).json({
                message: 'Product added!',
                data: product
            });
            db.close();
        }).catch(function(err) {
            res.status(500).send(err);
        });
    });
};

exports.getProductById = function(req, res) {
    // validation
    req.checkParams('product_id', 'Invalid product_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

    MongoClient.connect(configuration.get('mongo.main'), function(err, db) {
        // get the collection
        var products = db.collection('products');

        var product_id = ObjectID(req.params.product_id);
        var query = {
            "_id": product_id
        };

        products.findOne(query).then(function(product) {
            res.status(200).json({
                data: product
            });
            db.close();
        }).catch(function(err) {
            res.status(404).send(err);
        });
    });
};

exports.updateProductById = function(req, res) {
    // validation
    req.checkParams('product_id', 'Invalid product_id').notEmpty();
    req.checkBody('price', 'Invalid price').notEmpty();
    req.checkBody('productName', 'Invalid productName').notEmpty();
    req.checkBody('productType', 'Invalid productType').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

    var newProduct = new Product();

    newProduct.productName = req.body.productName;
    newProduct.productType = req.body.productType;
    newProduct.price = req.body.price;

    MongoClient.connect(configuration.get('mongo.main'), function(err, db) {
        // get the collection
        var products = db.collection('products');

        var product_id = ObjectID(req.params.product_id);
        var query = {
            "_id": product_id
        };

        products.findAndModify(query, {}, {
            $set: newProduct
        }, {
            new: true,
            upsert: true
        }).then(function(product) {
            res.status(200).json({
                data: product
            });
            db.close();
        }).catch(function(err) {
            res.status(404).send(err);
        });
    });
};

exports.deleteProductById = function(req, res) {
    // validation
    req.checkParams('product_id', 'Invalid product_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send('There have been validation errors: ' + util.inspect(errors));
        return;
    }

    MongoClient.connect(configuration.get('mongo.main'), function(err, db) {
        // get the collection
        var products = db.collection('products');

        var product_id = ObjectID(req.params.product_id);
        var query = {
            "_id": product_id
        };

        products.findAndRemove(query, {}).then(function(product) {
            res.status(200).json({
                data: product
            });
            db.close();
        }).catch(function(err) {
            res.status(404).send(err);
        });
    });
};

exports.getProducts = function(req, res){
  MongoClient.connect(configuration.get('mongo.main'), function(err, db) {
      // get the collection
      var collection = db.collection('products');

      var query = {};

      if (req.query.productName != null)
      {
        query = {"productName": {$regex: req.query.productName, $options: 'i'}};
        console.log(query);
      }

      collection.find(query).toArray().then(function(products){
        res.status(200).json({
            data: products
        });
        db.close();
      }).catch(function(err) {
          res.status(404).send(err);
      });
  });
};
