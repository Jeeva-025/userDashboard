export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log("Validation failed:", error.details)
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map(err => err.message),
      });
    }
    next();
  };
  export default validateRequest;