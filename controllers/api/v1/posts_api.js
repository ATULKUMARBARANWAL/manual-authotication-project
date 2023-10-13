module.exports.index=function(req,res)//this index because of list down in API or we ca say like indexing
{
    return res.json(200,{
        message:"List Of Posts",
        posts:[]
    })
}