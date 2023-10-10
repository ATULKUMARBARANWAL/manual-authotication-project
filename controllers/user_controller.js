const User=require('../models/user');
const path=require('path');
const fs=require('fs');
// module.exports.profile = function (req, res) {
//     try {
//       if (req.cookies.user_id) {
//         User.findById(req.cookies.user_id, function (err, user) {
//           if (err) {
//             console.log('Error in finding user:', err);
//             return res.redirect('/users/sign-in');
//           }
  
//           if (user) {
//             return res.render('user_profile', {
//               title: "User Profile",
//               user: user
//             });
//           } else {
//             return res.redirect('/users/sign-in');
//           }
//         });
//       } else {
//         return res.redirect('/users/sign-in');
//       }
//     } catch (err) {
//       console.log('Error in profile function:', err);
//       return res.redirect('/users/sign-in');
//     }
//   };
//   // Rest of the functions with try-catch blocks

// module.exports.signUp = function (req, res) {
//     try {
//       return res.render('user_sign_up', {
//         title: "Codeial | Sign Up"
//       });
//     } catch (err) {
//       console.log('Error in signUp function:', err);
//       return res.redirect('/users/sign-in');
//     }
//   };
  
//   module.exports.signIn = function (req, res) {
//     try {
//       return res.render('user_sign_in', {
//         title: "Codeial | Sign In"
//       });
//     } catch (err) {
//       console.log('Error in signIn function:', err);
//       return res.redirect('/users/sign-in');
//     }
//   };

//   module.exports.create = function (req, res) {
//     try {
//       if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//       }
  
//       User.findOne({ email: req.body.email }, function (err, user) {
//         if (err) {
//           console.log('Error in finding user in signing up:', err);
//           return res.redirect('/users/sign-in');
//         }
  
//         if (!user) {
//           User.create(req.body, function (err, user) {
//             if (err) {
//               console.log('Error in creating user while signing up:', err);
//               return res.redirect('/users/sign-in');
//             }
  
//             return res.redirect('/users/sign-in');
//           });
//         } else {
//           return res.redirect('back');
//         }
//       });
//     } catch (err) {
//       console.log('Error in create function:', err);
//       return res.redirect('/users/sign-in');
//     }
//   };
//   module.exports.createSession = function (req, res) {
//     try {
//       User.findOne({ email: req.body.email }, function (err, user) {
//         if (err) {
//           console.log('Error in finding user in signing in:', err);
//           return res.redirect('/users/sign-in');
//         }
  
//         if (user && user.password === req.body.password) {
//           res.cookie('user_id', user.id);
//           return res.redirect('/users/profile');
//         } else {
//           return res.redirect('back');
//         }
//       });
//     } catch (err) {
//       console.log('Error in createSession function:', err);
//       return res.redirect('/users/sign-in');
//     }
//   };
 
  
  console.log('user controller is working fine')
module.exports.profile=function(req,res){
User.findById(req.params.id,function(err,user)
{
   return res.render('user',{
   title:'profile',
   profile_user:user
   })
})
  
}
//sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
return res.redirect('/users/profile');
    }
   return res.render('user_sign_in',{
      title:'codial'
   });
}
module.exports.update= async function(req,res)
{
  // if(req.user.id==req.params.id)
  // {
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
  //   {
  //     req.flash('success','Updated');
  //     return res.redirect('back');
  //   })

  // }
  // else{
  //   req.flash('error','Unauthorized');
  //   return res.status(401).send('Unathorized');
  // }
  if(req.user.id==req.params.id)
  {
    try{
     
      let user=await User.findById(req.params.id);
      
        User.uploadedAvatar(req,res,function(err)
        {
          
          if(err)
          {
            console.log('********multer_error ',err);
          }
        
          user.name=req.body.name;
          user.email=req.body.email;
          if(req.file)
          {
            if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar)))
            {
              fs.unlinkSync(path.join(__dirname,'..',user.avatar));

            }
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar=User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect('back');
        })
      
     
    }
    catch(err)
    {
      
      req.flash('error',err);
      return res.redirect('back');
    }
  }
  else{
    
    req.flash('error','Unauthorized');
    return res.status(401).send('Unathorized');
  }
}
//sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
return res.redirect('/users/profile');
    }
   return res.render('user_sign_up',{
      title:'codial'
   });
}
//sign up logic
module.exports.create = async function(req, res){
   if (req.body.password != req.body.conform_password){
       return res.redirect('back');
   }
   try{
      let user=await User.findOne({email:req.body.email});
      if(!user){
          try{
              let user=await User.create(req.body);
              return res.redirect('/users/sign-in');
          }catch(err){
              console.log('error in creating user');
              return;
          }
      }
      else{
          return res.redirect('back');
      }
  }catch(err){
      console.log('error in finding user');
          return;
  }
}


//sign in logic
// module.exports.createSession=function(req,res){
//  //step to authentication
//  // find the user
//  User.findOne({email:req.body.email},function(err,user){
//     if(err){
//         console.log('error in finding sign page');
//         return;
//     }
//     // handle user found
//     if(user){
//         //handle password which dos'not mach
//         if(user.password!=req.body.password){
//             return res.redirect('back');
//         }
//         // handle session creation
//         res.cookie('user_id',user.id);
//         return res.redirect('/users/profile');
//     }
//     else{
//         //handle user not found
//         return res.redirect('back');
//     }
//  });

// }


//profile page show the details
// module.exports.profile=function(req,res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user){
//                 return res.render('user',{
//                     title:'User Profile',
//                     user:user
//                 })
//             return res.redirect('/user/sign-in');
//         }
//         });
//     }
//     else{
//         return res.redirect('/user/sign-in');
//     }
// }

//sign in and  create a session for the user
module.exports.createSession=function(req,res)
{
  req.flash('success','Logged In Succesfully')
    return res.redirect('/');
}

// module.exports.destroySession=function(req,res)
// {
//     req.logout();
//     res.clearCookie('user_id');
//     return res.redirect('/');
// }
module.exports.destroySession = async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
       req.flash('success', 'Logged Out Successfully');
      return res.redirect("/");
    });
  };
//npm install mongoose@6.3.8


