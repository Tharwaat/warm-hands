import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";

export const addSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        //const updatedUser = await userService.updateUser(mapNewUserData(request))
        console.log(request.body);
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "Schedule has been added successfully",
        });
    } catch (error) {
        console.error(error.stack);
        next(error);
    }
}