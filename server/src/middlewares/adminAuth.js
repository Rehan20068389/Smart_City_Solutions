//Referance from chatgpt:"https://chatgpt.com/share/693dcbc6-add0-8008-bf76-50f05659fc0d"

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
