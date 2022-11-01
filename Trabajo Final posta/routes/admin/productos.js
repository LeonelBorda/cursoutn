var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');

router.get('/', async function(req, res, next) {

var productos = await productosModel.getProductos();

    res.render('admin/productos', {
        layout:'admin/layout',
        persona: req.session.nombre,
        productos
    });
  });

  router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await productosModel.deleteProductosById(id);
    res.redirect('/admin/productos')
  });

  module.exports = router;