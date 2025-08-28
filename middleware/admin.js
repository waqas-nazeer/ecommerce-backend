
// middleware/admin.js
module.exports = function (req, res, next) {
  if (req.user.role === "admin" || req.user.role === "superAdmin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
};
