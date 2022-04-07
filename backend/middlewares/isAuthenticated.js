const isAuthenticated = (req, res, next) => {
  if (req.session.username !== undefined) {
    console.log(req.session.username)
    next()
  } else {
    next(new Error('Not authenticated'))
  }
}

module.exports = isAuthenticated
