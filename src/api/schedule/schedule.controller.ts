import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";
import { number } from "joi";
import * as scheduleService from "../../services/schedule/schedule.service";

export const addSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await scheduleService.addSchedule(request.body);
        
        response.redirect("/user/home");

        // response.status(httpStatus.StatusCodes.OK).json({
        //     message: "Schedule has been added successfully",
        // });
    } catch (error) {
        console.error(error.stack);
        response.status(httpStatus.StatusCodes.BAD_REQUEST).json({
            message: error.message,
        });
    }
}

export const deleteSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const scheduleId : number = Number(request.params.scheduleId);

        await scheduleService.deleteSchedule(scheduleId);
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "Schedule has been deleted successfully",
        });
    } catch (error) {
        console.error(error.message);
        response.status(httpStatus.StatusCodes.NOT_FOUND).json({
            message: error.message,
        });
    }
}

export const fetchSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const schedules = await scheduleService.fetchSchedules();
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "Schedule has been fetched successfully",
            data: schedules
        });
    } catch (error) {
        console.error(error.message);
        response.status(httpStatus.StatusCodes.NOT_FOUND).json({
            message: error.message,
        });
    }
}

export const bookSchedule = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const scheduleId = Number(request.params.scheduleId);
        const patientId = request.body.patientId;

        await scheduleService.bookSchedule(patientId, scheduleId);
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "Schedule has been booked successfully",
        });
    } catch (error) {
        console.error(error.message);
        response.status(httpStatus.StatusCodes.NOT_FOUND).json({
            message: error.message,
        });
    }
}
