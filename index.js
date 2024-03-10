const express=require('express');
const debug = require('debug')('app:main');
const{Config}=require('./src/config/index');
const{ProductsAPI}=require('./src/products/index')
const{SalesAPI}=require('./src/sales/index')

const app=express();
app.use(express.json())

ProductsAPI(app)
SalesAPI(app)

app.listen(Config.port,()=>{
    debug(`Servidor escuchando en el puerto ${Config.port}`)
})