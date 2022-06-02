module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    const status = err.details[0].type.includes('min') ? 422 : 400;

    return res.status(status)
      .json({ message: err.details[0].message.replace(/\[\d]./g, '') });
  }

  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};
