const handleError = (error) => {
  const err = { message: '' };
  if (error.message.includes('required') || error.message.includes('empty')) {
    err.message = 'Some required fields are missing';
    return err;
  }
  if (error.message.includes('array') || error.message.includes('items')) {
    err.message = '"categoryIds" not found';
    return err;
  }
  return error;
};

module.exports = handleError;