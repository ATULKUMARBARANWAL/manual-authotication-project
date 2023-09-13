{
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();
        });
    }
    createPost();
}

    // method to submit the form data for rnew post using AJAX
    // let createPost = function () {
    //     let newPostForm = $('#new-post-form');

    //     newPostForm.submit(function (e) {
    //         e.preventDefault();
    //         $.ajax({
    //             type: 'post',
    //             url: '/posts/create',
    //             data: newPostForm.serialize(),
    //             success: funct