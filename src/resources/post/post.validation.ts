// Ensures they pass the correct parameters when making the request.
// Can be used also for e.g the update of a post request
import Joi from 'joi';

const create = Joi.object({
    title: Joi
        .string()
        .required(),
    body: Joi
        .string()
        .required()
})

export default { create };