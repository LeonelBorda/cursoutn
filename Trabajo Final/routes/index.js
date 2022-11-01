var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var productosModel = require('../models/productosModel')
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {

  var productos = await productosModel.getProductos()

  productos = productos.splice(0, 5);
  productos = productos.map(producto => {
    if(producto.img_id) {
      const imagen = cloudinary.url(producto.img_id, {
        width: 600,
        crop: 'fill'
      });
      return {
        ...producto,
        imagen
      }
    } else {
      return {
        ...producto,
        imagen: ''
      }
    }
  })

  res.render('index', {
    productos
  });
});

router.post('/', async(req, res, next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var email = req.body.email;
  var teléfono = req.body.tel;
  var dirección = req.body.dirección;
  var ciudad = req.body.ciudad;
  var provincia = req.body.provincia;
  var si = req.body.si;

  var obj = {
    to: 'leoaleborda.5@gmail.com',
    subjet: 'Contacto desde la web',
    html: nombre + " se contactó desde la web y quiere más info al siguiente email:" + email + " .<br> Su número telefónico es el siguiente:" + teléfono + ".<br> Su domicilio es: " + dirección + ", " + ciudad + ", " + provincia
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  })
})

module.exports = router;
