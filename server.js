var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var configuration = require('./config/configuration');
var productRoute = require('./routes/product');

var app  = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

var router = express.Router();

// register all our routes with /api
app.use('/api', router);

// initial dummy router for testing
// http://localhost:3000/api
router.get('/', function(req, res){
    res.json({message: 'Hello World!'});
});

router.post('/products', productRoute.addProduct);

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
