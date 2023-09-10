const express =require('express');
const multer = require('multer');
// Configure Multer to specify where to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const {createUser, userSignIn} = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const { isAuth } = require('../middlewares/auth');
const { createProduct } = require('../controllers/product');
const { uploadtoCloudinarymiddleware } = require('../middlewares/productupload');
const { updateStock } = require('../middlewares/updateStock.');


// Route to handle the FormData and file upload
router.post("/Product-Image", upload.single("file"), uploadtoCloudinarymiddleware);
// send to db
router.post('/create-user',validateUserSignUp,userValidation,createUser );
router.post('/sign-in',validateUserSignIn,userValidation,userSignIn);
router.post('/add-product',createProduct);
router.post('/create-post',isAuth, (req,res)=>{
    res.send('welcome you are in secrest route')
});
router.post('/update-stock', upload.none(), updateStock);

module.exports =router;
