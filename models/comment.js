const mongooose=require('mongoose');

const commentSchema=new mongooose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{ 
    type:mongooose.Schema.Types.ObjectId,
    ref:user
    },
    post:{
        type:mongooose.Schema.Types.ObjectId,
        ref:post  
    },
     {
        timestamps:true
    }
})