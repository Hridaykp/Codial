const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                // post.comments.push(comment);
                if (Array.isArray(comment.venue)) {
                    comment.venue.push(comment);
                } else {
                    comment.venue = [comment];
                }
                post.save();
                res.redirect('/');
            }

            )
        }
    })
}