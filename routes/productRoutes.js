
    const express = require ('express');
    const auth = require('../middleware/auth');
    const upload = require('../middleware/uploads');
    const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productcontoller');
    const admin = require('../middleware/admin');



    const router = express.Router();


    router.get('/', getProducts);
    router.get('/:id',getProductById);

    // protected routes only logged-in user 

    router.post('/',auth,admin, upload.single('image'), addProduct);
    router.put('/:id',auth,admin, upload.single('image'), updateProduct);
    router.delete('/:id',auth,admin, deleteProduct);


    module.exports = router;    