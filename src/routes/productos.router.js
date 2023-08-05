const express = require('express');
const router = express.Router();

const contenedor = require('../contenedorProd')


// Ruta para mostrar todos los productos
router.get('/api/products', async(req, res) => {
    const todosProductos =  await contenedor.getAll()
    console.log(todosProductos)
    res.json(todosProductos);
});

// Ruta para mostrar un producto especificado por su ID
router.get('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)
    const productoBuscado = await contenedor.getById(pid)
    return res.json(productoBuscado);
});

// Ruta para agregar un nuevo producto
router.post('/api/products', async(req, res) => {
    const newProduct = req.body;
    console.log(newProduct)
    await contenedor.save(newProduct)
    res.json({ message: 'Producto agregado correctamente.' });
});


// Ruta para actualizar un producto por su ID 
router.put('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;
    console.log(pid)
    console.log(updateFields)
    // Valido que se proporcionen campos al menos un campo para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    const productModify = await contenedor.modifyById(pid, updateFields)
    return res.json(productModify);
});

// Ruta para eliminar un producto por su ID 
router.delete('/api/products/:pid', async(req, res) => {
    const pid = parseInt(req.params.pid);
    await contenedor.deleteId(pid)
    res.json({ message: 'Producto eliminado con éxito'})
});

module.exports = router;