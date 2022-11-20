import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validateMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validateOptions = {
            abortEarly: false,   // don't break on 1st validation failure, continue till end & report all validation failures
            allowUnknown: true,  // don't break on unknown values against schema, continue till end before reporting 
            stripUnknown: true,   // strip data that isn't part of schema
        };

        try {
            const value  = await schema.validateAsync(req.body, validateOptions);
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    }
}

export default validateMiddleware;
