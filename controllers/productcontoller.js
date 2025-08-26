
const db = require('../models');
const Product = db.product;

// get all products
exports.getProducts = async (req, res)=> {

    try {
        const products = await  Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({error : err.message});
    }

};

// get product by id 

exports.getProductById = async (req, res)=> {

   try {
     const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({message : "PRODUCT NOT FOUND"});
    res.json(product)
   } catch (err) {
    res.status(500).json({error: err.message})
   }

};

// Add new product (protected route)

exports.addProduct = async (req, res)=> {
try {
    
    const {name, description, price, stock} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      imageUrl,
    });
    res.status(201).json({ message: "Product added successfully", product});    
} catch (err) {
    res.status(500).json({message : err.message});
}
}

// update product (protected route)

exports.updateProduct = async (req, res) => {
 const {name,description,price,stock} = req.body;
 try {
    const product = await Product.findByPk(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
   // if new image uploaded
    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;
    await product.save();
   res.json({ message: "Product updated successfully", product });
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
};

// delete product (protected route);


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        // console.log(product);
        
            if(!product) return res.status(404).json({message : "Product Not Found"});

      await  product.destroy();
      res.json({message : "Product Deleted Successfully"})
    } catch (err) {
           res.status(500).json({ error: err.message });
    }

}