const express = require('express');
const path = require('path');
const productsRouter = require('./routes/productos.router');
const cartsRouter = require('./routes/carrito.router');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productsRouter);
app.use('/', cartsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});