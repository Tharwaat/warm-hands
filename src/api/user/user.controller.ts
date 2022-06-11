import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";

export const update = async (request: Request, response: Response, next: NextFunction) => {
    try {

        response.status(httpStatus.StatusCodes.OK).json({
            message: "User has been Updated successfully",
        });
    } catch (error) {
        console.error(error.stack);
        next(error);
    }
}

