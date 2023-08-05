const express = require('express');
const router = express.Router();

const contenedor = require('../contenedorCart')

// Ruta para agregar un nuevo carrito
router.post('/api/carts', async(req, res) => {
    const newCart = {products: []}
    await contenedor.save(newCart)
    res.json({ message: 'carrito agregado correctamente.' });
});

// Ruta para mostrar los productos de un carrito especificado por su ID
router.get('/api/carts/:cid', async(req, res) => {
    const cid = parseInt(req.params.cid);
    const carritoBuscado = await contenedor.getById(cid)
    console.log(carritoBuscado)
    if(carritoBuscado){
        const productosEnCarrito = carritoBuscado.products
        return res.json(productosEnCarrito);
    }else{
        return res.status(400).json({ error: 'No existe el carrito con el ID solicitado.' });
    }
});

// Ruta para agregar productos a un carrito especificado
router.post('/api/carts/:cid/product/:pid', async(req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid);
    const carritoBuscado = await contenedor.getById(cid)
    const productosEnCarrito = carritoBuscado.products // array
    const productoExistente = productosEnCarrito.find((producto) => producto.product === pid);
    if (productoExistente) {
        // Si el producto ya existe, incrementa su cantidad
        productoExistente.quantity += 1;
    } else {
        // Si el producto no existe, lo agrego al array
        productosEnCarrito.push({ product: pid, quantity: 1});
    }
    const updateFields = {id: cid, products: productosEnCarrito}
    await contenedor.modifyById(cid, updateFields)

    res.json({ message: 'producto agregado al carrito correctamente.' });
});

module.exports = router;