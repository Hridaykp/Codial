const Post = require('../models/post');

module.exports.home = function(req, res){
    // return res.end("<h1>Express is up for codial</h1>")
    // console.log(req.cookies);
    // return res.render('home', {
    //     title:"Home"
    // });

// populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        // console.log(posts);
        return res.render('home', {
            title: "Codial | Home",
            posts: posts
        });
    })
}


