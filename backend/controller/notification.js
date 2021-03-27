const Blog=require('../models/blog');
module.exports={
    showAllNotification:async(req,res)=>{
        const blogs=await Blog.find({});
        if(blogs.length>0){
            res.status(200).json({
                data:blogs
            })
        } else{
            res.status(500).json({
                message:'No data found'
            })
        }
    },
    createForm:(req,res)=>{
        res.render("notifications/new");
    },
    createNewNotification:(req,res)=>{
        const {title,image,description}=req.body;
        Blog.create({
            title:title,
            image:image,
            description:description
        }).then(blog=>{
            res.redirect('/notifications');
        })
        .catch(err=>{
            res.render("notifications/new");
        })
    },
    showNotificationById:async(req,res)=>{
        const blog=await Blog.findById(req.params.id);
        if(blog){
            res.status(200).json({
                data:blog
            })
        }else{
            res.status(500).json({
                messgae:'Data not Found'
            })
        }
    },
    editForm:(req,res)=>{
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err)
            {
                res.redirect("/notifications");
            }else{
                res.render("notifications/edit",{blog:foundBlog});
            }
        })
    },
    updateNotificationById:(req,res)=>{
        Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
            if(err)
            {
                res.redirect("/notifications");
            } else{
                res.redirect("/notifications/"+req.params.id);
            }
        })
    },
    deleteNotificationById:(req,res)=>{
        Blog.findByIdAndRemove(req.params.id,function(err){
            if(err)
            {
                res.redirect("/notifications");
            }else {
                res.redirect("/notifications");
            }
        })
    }
}