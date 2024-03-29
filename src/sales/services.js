const{ObjectId}=require('mongodb')
const debug=require('debug')('app:module-database')
const{ Database } = require('../database/index')

const COLLECTION='ventas';

const create=async(sale)=>{
    const collection=await Database(COLLECTION)
    let result=collection.insertOne(sale)
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


const deleteSale=async(id)=>{
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}


module.exports.SalesService={
    create,
    getAll,
    getByID,
    update,
    deleteSale
}