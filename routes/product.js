var MongoClient = require('mongodb').MongoClient;

var configuration = require('../config/configuration');
var Product = require('../models/product');


exports.addProduct = function(req, res){
    var product = new Product();

    product.productName = req.body.productName;
    product.productType = req.body.productType;
    product.price = req.body.price;

    MongoClient.connect(configuration.get('mongo.main'), function(err, db){
        // get the collection
        var products = db.collection('products');
        products.insertOne(product).then(function(result){
            res.status(200).json({
                message: 'Product added!',
                data: product
            });
            db.close();
        }).catch(function(err){
            res.status(500).send(err);
        });
    });
};
