const{ObjectId}=require('mongodb')
const debug=require('debug')('app:module-database')
const{ Database } = require('../database/index')
const {ProductsUtils} =require('./utils')

const COLLECTION='productos';

const create=async(product)=>{
    const collection=await Database(COLLECTION)
    let result=collection.insertOne(product)
    return result.insertedId
}


const getAll=async()=>{
    const collection=await Database(COLLECTION);
    return await collection.find({}).toArray();
}


const getByID=async(id)=>{
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: new ObjectId(id) });
}


const update = async (id, updatedData) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
}


const deleteProd=async(id)=>{
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}


const generarReporte=async(name, res)=>{
    let productos=await getAll();

    ProductsUtils.excelGenerate(productos, name, res)
}

module.exports.ProductsService={
    create,
    getAll,
    getByID,
    update,
    deleteProd,
    generarReporte
}