Sample REST API with Express and MongoDB native driver

To start the server with debug capabilies:
```
nodemon --debug server.js
```

Start the debugger:
```
node-inspector
```


Configuration and startup:
```
NODE_ENV=production node server.js
```

Routes:

```
http://localhost:{EXPRESS_PORT}/api
```


Examples:

```javascript
// initial dummy router for testing
// http://localhost:3000/api
router.get('/', function(req, res){
    res.json({message: 'Hello World!'});
});
```

```javascript
// add product
var request = require("request");

var options = { method: 'POST',
  url: 'http://127.0.0.1:8080/api/products/',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': 'b339de09-168a-e60d-060a-173681ff280d',
     'cache-control': 'no-cache' },
  form:
   { productName: 'adding product',
     productType: 'my type',
     price: '33' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

```javascript
// get products
var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:8080/api/products',
  headers:
   { 'postman-token': '0c88c099-3dda-4e32-27d6-18660862f7b2',
     'cache-control': 'no-cache'
   }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

```javascript
// get product my filter, case insensitive
var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:8080/api/products',
  qs: { productName: 'removed' },
  headers:
   { 'postman-token': '651739f4-cde8-5f53-c79e-8d24364b6ffe',
     'cache-control': 'no-cache' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

```javascript
// update product
var request = require("request");

var options = { method: 'PUT',
  url: 'http://127.0.0.1:8080/api/products/5791fb99e00b70243c6b8385',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': '91ca875c-ecf7-39ac-7e64-c4b2c5ec2a68',
     'cache-control': 'no-cache' },
  form:
   { productName: 'my updated product',
     productType: 'my updated type',
     price: '55'
   }
 };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

```javascript
// delete product
var request = require("request");

var options = { method: 'DELETE',
  url: 'http://127.0.0.1:8080/api/products/5791fb99e00b70243c6b8385',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': 'bd12a56f-eed2-4fc0-6f39-14b1a449f76e',
     'cache-control': 'no-cache' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
