const express = require("express");
const router = express.Router();
const Product = require("../models/Product");



// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//get product for singlePage{id}
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update product by id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id',async(req,res)=>{
    try{
        const deleted = await Product.findByIdAndDelete(req.params.id);
        res.json(deleted);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
})

module.exports = router;