const express = require("express");
const router = express.Router();

var shopItems = [];
var id = 0;


//get all items
router.get("/",(req,res)=>{
    res.json(shopItems);
});

//get a single item
router.get("/:id",(req,res)=>{

    const found = shopItems.some(item => item.id === Number(req.params.id));

    if(found){
        res.json(shopItems.filter(item => item.id === Number(req.params.id)));
    }
    else{
        res.status(404).json({message : "item with id:"+req.params.id+" not found"});
    }
});


//create a item
router.post("/",(req,res)=>{
    const newItem = {
        id: id+1,
        name: req.body.name,
        price: "$"+req.body.price
    };
   
    if(!newItem.name||!newItem.price){
        res.status(400).json({message: "One or more fields are invalid"});
    }
    else{
        shopItems.push(newItem);
        res.json(shopItems);
    }
    id++;
});

//update a item
router.put("/:id",(req,res)=>{

    const found = shopItems.some(item => item.id === Number(req.params.id));

    if(found){
        const updated = req.body;
        shopItems.forEach(item=>{
            if(item.id ===  Number(req.params.id)){
                item.name = updated.name ? updated.name : item.name;
                item.price = updated.price ? updated.price : item.price;
                res.json({ msg: 'item updated', item })
            }
        })

    }
    else{ 
        res.status(404).json({message : "item with id:"+ req.params.id +" not found"});
    }
});

//delete a item
router.delete("/:id",(req,res)=>{

    const found = shopItems.some(item => item.id === Number(req.params.id));

    if(found){
        res.json({
            message: "item with id " + req.params.id + " has been deleted",
            shopItems: shopItems.filter(item => item.id !== Number(req.params.id))
        });
        
        shopItems = shopItems.filter(item => item.id !== Number(req.params.id));

    }
    else{
        res.status(404).json({message : "item with id:"+req.params.id+" not found"});
    }
});

module.exports = router;
