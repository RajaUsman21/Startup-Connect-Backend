import Joi from 'joi';

const StartupValidator = {
  register: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.string().required(),
      website: Joi.string().uri().allow(null, ''),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Invalid data",
        error,
      });
    }
    next();
  },
};

export default StartupValidator;
