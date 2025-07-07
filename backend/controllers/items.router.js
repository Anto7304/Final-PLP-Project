const express = require('express');
const Items = require('../models/items');


// posting items
const postAll = async(req,res) =>{
    try {
        const item = new Items(req.body)
        await item.save();
        res.status(201).json({success: true, message: "Item saved",post: item})
        console.log("item saved successfully");
    } catch (error) {
        res.status(500).json({success:false, message: error});
        console.error("item not saved due to: ", error);
    }
}


// fetching all the items
const fetchAll = async(req,res)=> {
    try {
        const item= await Items.find()

        if(!item){
            return res.status(400).json({success: false, message: "no item like that"});
        };
        res.status(200).json({success: true, message: item});
        console.log("all the items fetched")
    } catch (error) {
        res.status(500).json({success:false, message: error});
        console.error("failed to fetch items", error);
    }
}


// fetching by id
const fetchOne =async (req,res)=>{
    try {
        const id=req.params.id;
        const item= await Items.findById(id)
        if (!item ){
        return res.status(404).json({success: false, message: "enter the correct id to get the item"})
    }
        res.status(200).json({success: true, message: item});
        console.log("one item fetched")
    } catch (error) {
         res.status(500).json({success:false, message: error});
        console.error("failed to fetch the item", error);
    }
}


// updating an item through id
const updateItem = async(req, res)=>{
    try {
        const id = req.params.id ;
        const item=  await Items.findByIdAndUpdate(id, req.body,{
            new : true,
            runValidators: true
        })

        if(!item ){
            return  req.status(500).json({success: false, message: "item not found  or put the correct id"});
        }
        res.status(201).json({success: true, message: item});
        console.log("updated  successfull")
    } catch (error) {
        res.status(500).json({success:false, message: error});
        console.error("failed to update the item", error);
    }
};

// finding and deleting the items by finding by id

const deleteItem = async(req, res)=> {
    try {
        const id = req.params.id;
        const item  = await Items.findByIdAndDelete(id);
         if (!item){
        return res.status(404).json({success: false, message: "failed to delete thew item"})
     }
     res.status(201).json({success: true, message: item})
    } catch (error) {
        res.status(500).json({success:false, message: error});
        console.error("failed to update the item", error);
    }   
    
}













module.exports= {postAll, deleteItem,updateItem,fetchAll,fetchOne};