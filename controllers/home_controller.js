const Post = require("../models/post");
const User = require("../models/user");
// module.exports.home=function(req,res){
// console.log(req.cookies);
// Post.find({},function(err,posts)
// {
//     return res.render('home',{
//     title:"Codeial|Home",
//     posts:posts
// });
// })
//.populate ka mtlb fetching all data from the database normally only refrence fetch kr paata hai
// module.exports.home = function (req, res) {
//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       User.find({}, function (err, users) {
//         return res.render("home", {
//           title: "Codeial|Home",
//           posts: posts,
//           all_users: users,
//         });
//       });
//     });
// };
//

//usig promises
module.exports.home=async function(req,res)
{
   try{
   let posts= await Post.find({})
   .populate("user")
   .populate({
     path: "comments",
     populate: {
       path: "user",
     },
   })
   let users=await User.find({})
   {
      return res.render("home", {
        title: "Codeial|Home",
        posts: posts,
        all_users: users,
      });
    }
   }
    catch(err){
      console.log("error",err);
      return;
    }
}