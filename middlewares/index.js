const ObjectId = require('mongoose').Types.ObjectId

const validateDbId = (paramName) => (req, res, next) => {
    const id = req.params[paramName];
  
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: `Given object ID (${id}) for "${paramName}" is not valid.`,
      });
    }
  
    next();
  };

function schema_validation(validator) {
    return (req, res, next) => {
      const { error } = validator.validate(req.body, { abortEarly: true });
      if (error) {
        return res.status(400).json(error.details[0].message);
      }
      next();
    };
  }

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'no record with given _id : ' + req.params.id
    })
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

const checkIfidExists = (Model, id) => {
  return new Promise((resolve, reject) => {
    Model
      .findById(id)
      .then((data) => {
        if (!data) {
          reject({
            status: 404,
            message: `Object ID (${id}) not found in the 'model' collection.`,
          });
        } else {
          resolve(data);
        }
      })
      .catch((err) => reject(err));
  });
};
module.exports = {
    validateDbId,
    raiseRecord404Error,
    errorHandler,
    schema_validation,
    checkIfidExists
}