import * as httpStatus from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { loginSchema, tokenValidationSchema, userRegistrationSchema } from "./auth.validation";
import { NextFunction, Request, Response } from "express";
import { Joi } from "celebrate";
import { key } from "../../config/config";

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


const validateUserLoginRequestBody = (request: Request, response: Response, next: NextFunction): void => {
    try {
        Joi.validate(request.body, loginSchema, (error, value) => {
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

const validateAccessTokenHeader = (request: Request, response: Response, next: NextFunction): void => {
    try {
        if (!request.headers.access_token) {
            response.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                message: "Permission Denied: Not Authorized",
            });
        }
        next();
    } catch (error) {
        throw error;
    }
}

const verifyAccessToken = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const token  = request.headers.access_token.toString();
        jwt.verify(token, key);
        next();
    } catch (error) {
        response.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
            message: "Permission Denied: Not Authorized | MALFORMED TOKEN",
        });
    }
}

export {
    validateNewUserRequestBody,
    validateUserLoginRequestBody,
    validateAccessTokenHeader,
    verifyAccessToken,
}