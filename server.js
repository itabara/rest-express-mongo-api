var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var configuration = require('./config/configuration');
var productRoute = require('./routes/product');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!

var router = express.Router();

// register all our routes with /api
app.use('/api', router);

// initial dummy router for testing
// http://localhost:3000/api
router.get('/', function(req, res){
    res.json({message: 'Hello World!'});
});

// create endpoint to handle /products
router.route('/products')
    .get(productRoute.getProducts)
    .post(productRoute.addProduct);

// create endpoint to handle /products:/productId
router.route('/products/:product_id')
    .get(productRoute.getProductById)
    .put(productRoute.updateProductById)
    .delete(productRoute.deleteProductById);

// start the server
app.listen(
    configuration.get('express.port'),
    configuration.get('express.ip')
);

console.log('Server running on http://%s:%d',
    configuration.get('express.ip'),
    configuration.get('express.port')
);

console.log('Database: %s', configuration.get('mongo.main'));
