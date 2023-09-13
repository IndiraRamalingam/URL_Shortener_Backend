const express=require('express')
const router=express.Router();
const urlController=require('../controllers/url/urlController')

//to get the ID of User
router.get('/getId',urlController.getUserID);

//get the longURL and generate a short URL
router.post('/generateShortURL/:id', urlController.generateShortURL);

//get all urls
router.get('/all/:id',urlController.getAll);

//For Url redirection
router.get('/:id',urlController.redirectUrl);

module.exports=router;