import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";
import * as scheduleService from "../../services/schedule/schedule.service";

export const addSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await scheduleService.addSchedule(request.body);
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "Schedule has been added successfully",
        });
    } catch (error) {
        console.error(error.stack);
        response.status(httpStatus.StatusCodes.BAD_REQUEST).json({
            message: error.message,
        });
    }
}