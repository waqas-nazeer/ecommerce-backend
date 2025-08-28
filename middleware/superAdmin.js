
module.exports = function (req, res, next){
if (req.user.role !== 'superAdmin') {

    return res.status(403).json({message : 'Access denied. SuperAdmins only.' })
}
next();
}