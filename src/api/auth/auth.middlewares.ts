import * as httpStatus from "http-status-codes";
import { userRegistrationSchema } from "./auth.validation";
import { NextFunction, Request, Response } from "express";
import { Joi } from "celebrate";

const validateNewUserRequestBody = (request: Request, response: Response, next: NextFunction): void => {
    try {
        Joi.validate(request.body, userRegistrationSchema, (error, value) => {
            if (error) {
                response.status(httpStatus.StatusCodes.BAD_REQUEST).json({
                    message: error.message,
                });
                throw new Error(error.message);
            }
        });
        next();
    } catch (error) {
        throw error;
    }
}

export {
    validateNewUserRequestBody,
}