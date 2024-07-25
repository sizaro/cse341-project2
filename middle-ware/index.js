const Authenticated = (req, res, next) =>{
    if(req.session.user === undefined){
        return res.status(401).json("you have no access")
    }
    next()
}

module.exports = {Authenticated}