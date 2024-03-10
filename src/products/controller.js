const debug=require('debug')('app:products-module-controller')
const {ProductsService} = require('./services')
const {Response}=require('../common/response')
const createError=require('http-errors')

module.exports.ProductsController={
    createProducts:async(req, res)=>{
        try {
            const {body}=req;
            if(!body || Object.keys(body).length===0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId=await ProductsService.create(body)
                Response.success(res, 201, `Producto Agregado`,insertedId)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },


    getProducts:async(req, res)=>{
        try {
            let products=await ProductsService.getAll()
            Response.success(res, 200, 'Lista de productos',products)
            debug('QUE PEX')
        } catch (error) {
            Response.error(res)
            debug(error)
        }
    },


    getProduct:async(req, res)=>{
        try {
            const{params:{ id } }=req;
            let product=await ProductsService.getByID(id);

            if(!product){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Producto ${id}`,product)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    
    updateProduct: async (req, res) => {
        try {
            const { params: { id }, body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const result = await ProductsService.update(id, body);
                Response.success(res, 200, `Producto ${id} actualizado`, result);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    

    deleteProduct:async(req, res)=>{
        try {
            const{params:{ id } }=req;
            let product=await ProductsService.deleteProd(id);

            if(!product){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Producto ${id} eliminado`,product)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    generarReporte:async(req, res)=>{
        try {
            ProductsService.generarReporte('Inventario', res)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    }

}