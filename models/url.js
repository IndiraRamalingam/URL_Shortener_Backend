const mongoose = require('mongoose')
const Schema=mongoose.Schema;

const urlSchema = new mongoose.Schema(
    {
      shortId: {
        type: String,
        required: true,
        unique: true,
      },
      shortURL:{
        type:String,
        required:true,
      },
      longURL: {
        type: String,
        required: true,
      },
      createdAt:{
        type:Date,
        required:true,
        default:Date.now
       },
       clicks:{
        type:Number,
        required:true,
        default:0,
       },
      visitHistory: [{ 
        timestamp: { type: Number } 
      }],
      user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }],
      },
      { timestamps: true },  
  );

module.exports=mongoose.model('Url',urlSchema,'urls');