
const multer = require('multer');

const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
     cb(null, 'uploads/');
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    },

});

// only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image\/jpeg|image\/png|image\/gif/.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only images are allowed'));
};
    
    module.exports = multer({storage, fileFilter,limits: { fileSize: 5 * 1024 * 1024 } })