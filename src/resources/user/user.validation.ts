// Ensures they pass the correct parameters when making the request.
// Can be used also for e.g the update of a post request
import Joi from 'joi';

const register = Joi.object({
    username: Joi
        .string()
        .min(2)
        .max(30)
        .required(),
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .min(6)
        .required(),
})

const login = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .required(),
})

export default { register, login };