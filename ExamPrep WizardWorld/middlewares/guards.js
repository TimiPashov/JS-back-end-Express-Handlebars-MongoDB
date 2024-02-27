function hasUser(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

function isGuest(req,res,next){
    if (req.user) {
        res.redirect('/'); // TODO check assignment redirect
    } else {
        next();
    } 
};

module.exports = {
    hasUser, 
    isGuest
}