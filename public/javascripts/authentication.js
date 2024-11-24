function AuthenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    // returns true if the session was started
    return next(); // calls the next middleware in the stack
  } else {
    // user not authenticated
    res.redirect("/login");
  }
}
// make sure to export it
module.exports = AuthenticationMiddleware;
