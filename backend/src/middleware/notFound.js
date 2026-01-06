const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Resource not found',
    disclaimer: process.env.DISCLAIMER_TEXT
  });
};

module.exports = { notFound };
