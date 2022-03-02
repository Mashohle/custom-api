import { Request, Response, NextFunction, RequestHandler  } from "express";
import Joi from 'joi';

function validationMiddleware(Schema: Joi.Schema): RequestHandler {
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false, // Makes that on the first validation error, it will stop and show the user all the errors
            allowUnknow: true, // Allows it not to Fails/Crash if the values aren't part of the schema
            stripUnknow: true, // Then this strips the unknown stuff
        }

        try {
            const value = await Schema.validateAsync(
                req.body,
                validationOptions
            );
            
            // Assigns the validated parameters to req.body and call next() to continue with the request
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({
                errors: errors
            })
        }
    }
}

export default validationMiddleware;

