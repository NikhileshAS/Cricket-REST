module.exports = (req, res, next) => {
  console.log("Checking authentication", req.user);

  if (!req.user) {
    return res.status(401).send({ error: " You have to log in" });
  }
  next();
};
