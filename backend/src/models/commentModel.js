import mongoose from 'mongoose';


const commentSchema= new mongoose.Schema({

recipeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Recipe"
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    comment:{
        type:String,
        required:true
    },
    replies:[
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            reply:{
                type:String,
                required:true
            },
commentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
    },
    createdAt:{
        type:Date,  
    default :new Date().getTime()}

        }
    ]



},{timestamps:true})

export const Comment= mongoose.model("Comment", commentSchema)