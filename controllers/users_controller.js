const User = require("../models/user");
const { use } = require("../routes");

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title:"User Profile",
        // user: user
    });
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

//sign in and create a session for the user
// module.exports.createSession = function(req, res){
    //steps to authenticate->
    //find the user
//     User.findOne({email : req.body.email}, function(err, user){
//         if(err){
//             console.log("Error in creating user signing in");return;
//         }
//         //handle user found
//         if(user){
//             //handle password doesn't match
//             if(user.password != req.body.password){
//                 return res.redirect("back");
//             }
//              //handle session creation
//              res.cookie('user_id', user.id);
//              return res.redirect('/users/profile');
//         }
//         else{
//             //handle user not found
//             return res.redirect("back");
//         }
//     })
// }

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destryoSession = function(req, res){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
      });
}

   


    

