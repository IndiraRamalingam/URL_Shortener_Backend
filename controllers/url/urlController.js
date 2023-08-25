const User = require('../../models/user');
const Url = require('../../models/url');
const jwt = require("jsonwebtoken");
const config=require('../../utils/config');
const { request } = require('express');
const randomstring=require('randomstring');
const shortid=require("shortid");

const SECRET_KEY = config.SECRET_KEY;

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    return authHeader;
}

const urlController ={

    //To get the ID of User
    getUserID:async(req,res)=>{
        try{
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY);
            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            const user=await User.findById(decodedToken.userId).exec();
            const user_ID=user._id
            res.status(200).json({user_ID})
            
        }
        catch(error){
            console.error('Error in Fetching Patient ID',error)
            res.status(500).json({message:'Error in Fetching Patient ID'})
        }
    },

    //Get the Long URL and generate short URL
    generateShortURL:async(req,res)=>{
        try{
            const token = getTokenFrom(req);

            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY);

            // if the token is not valid, return an error
            if(!decodedToken){
                return response.json({ message: 'token invalid' });
            }
            //BaseUrl to concat with RandomString
            const BaseURL ='http://localhost:5173';

            //Getting the long URL from user
            const {longURL}=req.body;

            var user=await User.findById(req.params.id).exec();

            //Generate the random String
            const shortId = randomstring.generate({
                length: 6,
                charset: "alphanumeric",
            });
            
            //Created shortURL
            const shortURL=`${BaseURL}/${shortId}`;
            console.log(shortURL , shortId, longURL);

            //Save the details in DB
            const newUrl = new Url({
                shortId : shortId,
                shortURL:shortURL,
                 longURL : longURL,     
                 user:user._id,           
            })

            const result= await newUrl.save();

            user.url=user.url.concat(result._id)
            await user.save();
            res.status(201).json({message:"URL shortened successfully"})
        }
        catch(error){
            console.log("Error in creating URL ",error)
        }
    }

}

module.exports=urlController;