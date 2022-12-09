const { resolve, reject } = require('promise');
var db=require('../config/connection')
var collection=require('../config/collections');
const { response } = require('../app');
var objectId=require('mongodb').ObjectId
module.exports={

addProduct:(product,callback)=>{
    
    db.get().collection('product').insertOne(product,(err,data)=>{
        if(err) throw err;
             callback(data.insertedId);

    })
 },
     getAllProducts:()=>{
   return new Promise(async(resolve,reject)=>{
  let products=await db.get().collection(collection.PRODUCT_COLLLECTION).find().toArray()
  resolve(products)

 })

 },
 deleteproduct:(prodId)=>{
    return new Promise((resolve,reject)=>{
        console.log(prodId);
        console.log(objectId(prodId));
        db.get().collection(collection.PRODUCT_COLLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
          //  console.log(response);
            resolve(response)
        })
    })
 },
 getProductDetails:(prodId)=>{
  return new Promise((resolve,reject)=>{
    db.get().collection(collection.PRODUCT_COLLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
      resolve(product)
    })
  })
 },
 updateProduct:(prodId,ProDetails)=>{
  return new Promise((resolve,reject)=>{
    db.get().collection(collection.PRODUCT_COLLLECTION)
    .updateOne({_id:objectId(prodId)},{
      $set:{
         Name:ProDetails.Name,
         description:ProDetails.description,
         price:ProDetails.price,
        category:ProDetails.category

      }
  }).then((response)=>{
    resolve()
  })
})
 }
}
