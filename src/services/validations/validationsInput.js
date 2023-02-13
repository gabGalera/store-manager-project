const { nameSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate(name);

  let errorType = 500;
  if (error.message === '"value" length must be at least 5 characters long') {
    errorType = 422;
  } else {
    errorType = 400;
  }
  if (error) return { type: errorType, message: error.message.replace('value', 'name') };

  return { type: null, message: '' };
};

module.exports = {
  validateName,
};