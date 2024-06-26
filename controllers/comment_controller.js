const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      },function(err,comment){
        //handle error
        if(err)
        {
            console.log('error is:',err)
        }
        

          post.comments.push(comment);
          post.save();
          req.flash('success','Commented');
          res.redirect('/');
      });
    }
  });
};
module.exports.destroy=async function(req,res)
{
try{
  const comment=await Comment.findById(req.params.id);
  if(!comment)
  {
   return res.redirect.status(404).send('comment is not found');
  }
  if(comment.user.toString()==req.user.id)
  {
    let postId=comment.post;
    await comment.remove();
    await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
    req.flash('success','Comment has been deleted');
   return res.redirect('back');
  }
  else{
    req.flash('success','You cant able to delete comment');
    return res.redirect.status(404).send('not authorize user!')
  }
}
catch{
  req.flash('error')
  return res.status(500).send('Internal Server Error'); 
}
}
