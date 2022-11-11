const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
    return res.render('user_profile', {
        title:"User Profile",
        profile_user: user
    });
})}

module.exports.update = async function(req, res){
   
     if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("*****Multer Error: ", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                     if(user.avatar){
                       fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                     }
                    //saving the path of the uplodding file into the avatar field inthe user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized')
        return res.status(401).send('Unauthorized');

    }
}

//for render the sugn-up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codial | Sign UP"
    })
}


//render the sign-in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}


//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email :req.body.email},function(err, user){
        if(err){
            console.lof("Error in finding user signing up"); return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error in creating user signing up");return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


module.exports.destryoSession = function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    req.flash('success', 'You have logged out');
    return res.redirect('/');
      
}

   


    

