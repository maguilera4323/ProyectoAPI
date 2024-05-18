const express=require('express');
const{ProductsController}=require('./controller');
const cors = require('cors');
const router=express.Router();

router.use(cors({
    origin: '*', 
    methods: ['GET', 'POST','PUT', 'DELETE'],      
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

router
    .get('/', ProductsController.getProducts)
    .get('/report', ProductsController.generarReporte)
    .get('/:id', ProductsController.getProduct)
    .post('/', ProductsController.createProducts)
    .put('/:id', ProductsController.updateProduct)
    .delete('/:id', ProductsController.deleteProduct);

module.exports.ProductsAPI = (app) => {
    app.use('/api/products', router);
};