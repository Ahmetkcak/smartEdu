const User = require('../models/User');

module.exports = (req,res,next) => {
    let user = User.findById(req.session.userID);
    if(!user){
        return res.redirect('/login');
    }
    next();
}