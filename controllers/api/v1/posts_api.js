const Post=require('../../../models/post')
const Comment=require('../../../models/comment')
module.exports.index=async function(req,res)//this index because of list down in API or we ca say like indexing

{
    let posts= await Post.find({})
    .sort('-createdAt')////for sorting of POST
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    return res.json(200,{
        message:"List Of Posts",
        posts:posts
    })
}


module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found"); // Handle the case where the post is not found
    }

    // Check if the user is the author of the post
   // if (post.user.toString() === req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });
      // if(req.xhr)
      // {
      //   return res.status(200).json({
      //     data:{
      //       post_id:req.params.id
      //     },
      //     message:"Post Deleted"
      //   })
      // }
      // req.flash('success','Post Deleted')
      return res.json(200,{
        message:"Post and comment associated deleted succesfully"
      })
    // } else {
    //   req.flash('error','You can not able to delete the post');
    //   return res.status(403).send("You are not authorized to delete this post");
    // }
  } catch (err) {
   
    console.log(err);
   // return res.status(500).send("Internal Server Error");  Handle other errors
   return res.status(500,{
    message:"Internal Server Error"
   });
  }
};