const Post = require("../models/post");
const Comment = require("../models/comment");
const { post } = require("../routes");
module.exports.create = async function (req, res) {
  try {
    let post=await Post.create({
      content: req.body.content,
      user: req.user._id,

    });
    if(req.xhr)
    {
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post Created !"
      })
    }
    req.flash('success','Post published')
    return res.redirect("back");
  } catch (err) {
    req.flash('error',err);
    return;
  }
};

// module.exports.destroy= async function(req,res)
// {
//   const post=await Post.findByIdAndDelete(req.params.id)
//                 console.log(post.user);
//                 console.log(req.user.id);
//      //.id convert the id into the string form
//      await Comment.deleteMany({
//         post:req.params.id                                             *ye bhi shi hai

//      }
//      )
//      return res.redirect('back');
//     }

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found"); // Handle the case where the post is not found
    }

    // Check if the user is the author of the post
    if (post.user.toString() === req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success','Post Deleted')
      return res.redirect("back");
    } else {
      req.flash('error','You can not able to delete the post');
      return res.status(403).send("You are not authorized to delete this post");
    }
  } catch (err) {
    req.flashe('error');
    return res.status(500).send("Internal Server Error"); // Handle other errors
  }
};
