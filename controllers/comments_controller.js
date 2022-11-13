const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
// const queue = require('../config/kue');
// const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');


module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                // handle error
            post.comments.push(comment);
            post.save();

            // comment = await comment.populate('user', 'name email').execPopulate();
            const user = await Comment.findById(comment._id).populate('user').exec();
            commentsMailer.newComment(user);
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            
            req.flash('success', 'Comment added!');
            res.redirect('/');
        }
       
    }catch(err){
        req.flash('error', err);
        return;
    }   
}


module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

            //deleted the associates likes for this comment
            await Like.deleteMany({likeable:post, onModel:'Post'});

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'comment deleted!');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }   
}
  
