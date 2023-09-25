const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
         required:true
    },
    name:{
        type:String,
        required:true
    },
   avatar: {
    type:String
    }
},{
    timestamps:true
});

//now connect multer AVATAR_PATH,avtar and path
let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        

      cb(null, path.join(__dirname,'..',AVATAR_PATH));//__dirname means /models/users.js '..'means one step above and AVATAR_PATH means /uploads/users/avtars
    },
    filename: function (req, file, cb) {
    //   let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + Date.now());//file.fieldname means every files that we store are in the form of avatar type: String
    }
  });
  //static methods
  userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');//.single('avatar') means that the in this section only one file is added called avatar
  userSchema.statics.avatarPath=AVATAR_PATH;//this line for the AVATAR_PATH is available publically for the user model

const User=mongoose.model('User',userSchema);
module.exports=User;

