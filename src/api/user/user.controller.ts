import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user.type";
import * as httpStatus from "http-status-codes";
import * as userService from "../../services/user/user.service";

export const update = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const updatedUser = await userService.updateUser(mapNewUserData(request))
        response.status(httpStatus.StatusCodes.OK).json({
            message: "User has been Updated successfully",
        });
    } catch (error) {
        console.error(error.stack);
        next(error);
    }
}

export const activate = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await userService.activateUser(Number(request.params.userId));
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "User has been activated successfully",
        });

    } catch (error) {
        response.status(httpStatus.StatusCodes.NOT_FOUND).json({
            message: "User is not found or error has occured",
            cause: error.message
        });
    }
}

export const fetchAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await userService.fetchAllUsers();
        
        response.status(httpStatus.StatusCodes.OK).json({
            message: "User has been activated successfully",
            data: users,
        });

    } catch (error) {
        response.status(httpStatus.StatusCodes.NOT_FOUND).json({
            message: "An error has occured",
            cause: error.message
        });
    }
}

const mapNewUserData = (request: Request): IUser => {
    try {
        const newUser: IUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            gender: request.body.gender,
            phoneNumber: request.body.phoneNumber,
            avatar: request.body.avatar,
            birthDate: request.body.birthDate,
        };

        return newUser;

    } catch (error) {
        throw error;
    }
}