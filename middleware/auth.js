
const jwt = require('jsonwebtoken');
const { user } = require('../models');


module.exports = function (req, res, next){

    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({message : "Access denied. No token provided."});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user data 
        next();
    } catch (error) {
        res.status(400).json({message:'Invalid token'});
    }
        
}