const AppError = require("../errors/AppError");

function validate(schema, source = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return next(new AppError(`Validation error: ${error.message}`, 400));
    }

    req[source] = value;
    return next();
  };
}

module.exports = validate;
