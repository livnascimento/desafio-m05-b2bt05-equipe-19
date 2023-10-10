//usado para o JOI verificar os dados que foram mandados no request

const verifyBodyRequest = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = verifyBodyRequest;
