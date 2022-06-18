import * as httpStatus from "http-status-codes";
import { addScheduleSchema } from "./schedule.validation";
import { NextFunction, Request, Response } from "express";
import { Joi } from "celebrate";

const validateAddScheduleRequestBody = (request: Request, response: Response, next: NextFunction): void => {
    try {
        Joi.validate(request.body, addScheduleSchema, (error, value) => {
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
    validateAddScheduleRequestBody,
}