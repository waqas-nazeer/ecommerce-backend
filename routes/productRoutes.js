
    const express = require ('express');
    const auth = require('../middleware/auth');
    const upload = require('../middleware/uploads');
    const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productcontoller');



    const router = express.Router();


    router.get('/', getProducts);
    router.get('/:id',getProductById);

    // protected routes only logged-in user 

    router.post('/',auth, upload.single('image'), addProduct);
    router.put('/:id',auth, upload.single('image'), updateProduct);
    router.delete('/:id',auth,deleteProduct);


    module.exports = router;