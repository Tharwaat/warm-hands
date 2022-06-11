import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";
import * as authService from "../../services/auth/auth.service";
import { IUser } from "../types/user.type";

export const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const createdUser = await authService.saveUser(mapNewUserData(request));

        response.status(httpStatus.StatusCodes.CREATED).json({
            message: "User has been created successfully",
            data: createdUser,
        });
    } catch (error) {
        console.error(error.stack);
        next(error);
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
            password: request.body.password,
        };

        return newUser;

    } catch (error) {
        throw error;
    }
}