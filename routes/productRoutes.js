
    const express = require ('express');
    const auth = require('../middleware/auth');
    const upload = require('../middleware/uploads');
    const productController = require('../controllers/productcontoller');
    const admin = require('../middleware/admin');



    const router = express.Router();


    router.get('/', productController.getProducts);
    router.get('/:id',productController.getProductById);

    // protected routes only logged-in user 

    router.post('/',auth,admin, upload.single('image'), productController.addProduct);
    router.put('/:id',auth,admin, upload.single('image'), productController.updateProduct);
    router.delete('/:id',auth,admin, productController.deleteProduct);


    module.exports = router;    