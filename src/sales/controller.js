const debug=require('debug')('app:services-module-controller')
const {SalesService} = require('./services')
const {Response}=require('../common/response')
const createError=require('http-errors')

module.exports.SalesController={
    createSale:async(req, res)=>{
        try {
            const {body}=req;
            if(!body || Object.keys(body).length===0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId=await SalesService.create(body)
                Response.success(res, 201, `Venta Agregada`,insertedId)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },


    getSales:async(req, res)=>{
        try {
            let sales=await SalesService.getAll()
            Response.success(res, 200, 'Lista de ventas',sales)
            debug('QUE PEX')
        } catch (error) {
            Response.error(res)
            debug(error)
        }
    },


    getSale:async(req, res)=>{
        try {
            const{params:{ id } }=req;
            let sale=await SalesService.getByID(id);

            if(!sale){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Venta ${id}`,sale)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    
    updateSale: async (req, res) => {
        try {
            const { params: { id }, body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const result = await SalesService.update(id, body);
                Response.success(res, 200, `Venta ${id} actualizada`, result);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    

    deleteSale:async(req, res)=>{
        try {
            const{params:{ id } }=req;
            let sale=await SalesService.deleteSale(id);

            if(!sale){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200, `Venta ${id} eliminada`,sale)
            }
            
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

}