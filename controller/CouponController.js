const Coupon=require('../models/Coupon')
const axios = require('axios');
require('dotenv').config();


const jwt = require('jsonwebtoken')
const create=async(req,res,next)=>{
    let coupon=new Coupon({
        id:req.user.id,
        offerName:req.body.offerName,
        couponCode:req.body.couponCode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        discountPercentage:req.body.discountPercentage,
        discountAmount:req.body.discountAmount,
        terms:req.body.terms,
        img:req.body.img,
        status:req.body.status,
        createdTo:req.body.createdTo
    })
    
    let response=await coupon.save()
    //console.log(response)
    res.status(200).json({
         response
    })       
}
// const create=async(req,res,next)=>{
//     let coupon=new Coupon({
//         id:req.user.id,
//         offerName:req.body.offerName,
//         couponCode:req.body.couponCode,
//         startDate:req.body.startDate,
//         endDate:req.body.endDate,
//         discountPercentage:req.body.discountPercentage,
//         discountAmount:req.body.discountAmount,
//         terms:req.body.terms,
//         img:req.body.img,
//         status:req.body.status
//     })
    
//     let response=await coupon.save()
//     //console.log(response)
//     res.status(200).json({
//          response
//     })       
// }

const update = async (req, res, next) => {
    let id = req.body._id;
    let {offerName,couponCode,startDate,endDate,discountPercentage,discountAmount,terms,img,status}=req.body
   
        
    let updatedData = {}
    
    if(offerName){updatedData.offerName= offerName}
    if(couponCode){updatedData.couponCode=couponCode}
    if(startDate){updatedData.startDate=startDate}
    if(endDate){updatedData.endDate=endDate}
    if(discountPercentage){updatedData.discountPercentage=discountPercentage}
    if(discountAmount){updatedData.discountAmount=discountAmount}
    if(terms){updatedData.terms=terms}
    if(img){updatedData.img=img}
    if(status){updatedData.status=status}
   
    let updateData= await Coupon.findByIdAndUpdate(id, { $set: updatedData },{new:true})
    //let newData=await Coupon.findById(id) //instead of new:true
    res.status(200).json({
        message: updateData
    })
    console.log(updateData);
}

const show=async(req,res,next)=>{
    let getdata=await Coupon.find({id:req.user.id})
    console.log(getdata)
    res.status(200).json({ 
        response:getdata
    })
}
// const show=async(req,res,next)=>{
//     let getdata=await Coupon.findById(req.query.id)
//     console.log(getdata)
//     res.status(200).json({ 
//         response:getdata
//     })
// }

const searchCode=async(req,res,next)=>{
    let getdata=await Coupon.find( { couponCode: { $regex: "123456" } } )
    console.log(getdata);
    res.status(200).json({ 
        response:getdata
    })


    
}

const searchName=async(req,res,next)=>{
    let getdata=await Coupon.find( { offerName: { $regex: "Diwali offer" } } )
    console.log(getdata)
    res.status(200).json({ 
        response:getdata
    })
}

const sortTime=async(req,res,next)=>{
    let getdata=await Coupon.find().sort( { createdAt:-1} )
    console.log(getdata)
    res.status(200).json({ 
        response:getdata
    })
}

const filterStatus=async(req,res,next)=>{
    let getdata=await Coupon.find({status:req.params.status})
    console.log(getdata)
    res.status(200).json({ 
        response:getdata
    })
}


const createTo=async(req,res,next)=> {
    try {
        let response = await axios({
            method: "GET",
            url: process.env.GET_ID,
            headers: {
                contentType: "application/json",
            }
        })
        console.log(response);
        res.status(200).json({ 
            response:response.data
        })
    } 
    catch(error){
        res.status(400).json({
            message:error
        })
    }
  }

module.exports={
    create,update,show,searchCode,searchName,sortTime,filterStatus,createTo
}