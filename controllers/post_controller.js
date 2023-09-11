const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (err) {
    console.log("err", err);
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

      return res.redirect("back");
    } else {
      return res.status(403).send("You are not authorized to delete this post");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error"); // Handle other errors
  }
};
