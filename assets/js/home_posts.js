console.log("helllo");
{
  //method to submit the form data for new post using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPostdom=newPostDom(data.data.post);
          console.log(data.data.post);
          $('#bla-bla').prepend(newPostdom);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  //method to create a post in DOM
  //creating a function in dom for converting html part which we have copy from _post.ejs to DOM
  let newPostDom = function (post) {
    return $(`   
      
       
          <li>
            <p>
             
              <small>
                    <a href="/posts/destroy/${ post.id }" class="delete-post-button">
                  <!-- <i class="fa-duotone fa-delete-right"></i>
                   -->
                   X
                </a>
              </small>
              ${post.content }
              <br />
              <small> ${ post.user.name }</small>
            </p>
    
            <div class="post-comments">
              
    
              <form action="/comments/create" method="POST">
                <input
                  type="text"
                  name="content"
                  placeholder="write comment here..." required
                />
                <input type="hidden" name="post" value="${ post.id }" />
                <input type="submit" name="Add Comment" />
              </form>
              
              <div class="post-comments-list">
             <ul id=post-comments-${post._id}>
             </ul>
              </div>
            </div>
          </li>`);
  };

  createPost();
}
//
