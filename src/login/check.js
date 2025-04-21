function auth(req, res, next) {
    if (req.session?.user === 'coder' && req.session?.admin) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
module.exports = auth;  