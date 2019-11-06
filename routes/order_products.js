var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
    db.Order_product.findAndCountAll().then(results => {
        return res.send(results);
    })
});

router.get('/:id', function(req, res) {
  db.Order_product.findByPk(req.params.id).then(result => {
      return res.send(result);
    })
});

router.post('/', function(req, res) {
  let order_product = req.body;

  db.Order-product.create(order_product).then(result => {
    return res.send(result);
   })
});

router.put('/:id', function(req, res) {
  let order_product_id = req.body.id;
  let order_product = req.body;
  db.Order_product.update(order_product, {
    where : {
      id: order_product_id
    }
  }).then(result => {
    res.send(result)
  })
});

router.delete('/:id',function(req, res){
  let order_product_id = req.params.id;
  
    if (!order_product_id) { 
        return res.status(400).send({ error: true, message: 'Please provide order_product_id' });
    }
    db.Order_product.destroy({
        where : {
            id : order_product_id
        }
    }).then(result => {
        console.log("Done");
        return res.send({ error: false, data: result, message: 'user has been updated successfully.' });
      });
}); 

module.exports = router;
