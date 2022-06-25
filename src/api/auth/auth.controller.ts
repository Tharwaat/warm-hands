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

export const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await authService.login(request.body.password, request.body.phoneNumber);

        if (user) {
            if (user.type === "provider" || user.type === "volunteer") {
                response.setHeader("Content-Type", "text/html");
                response.app.set("wrongCredentials", false);
                response.redirect("/user/home");
            } else {
                response.setHeader("Content-Type", "text/html");
                response.app.set("wrongCredentials", false);
                response.redirect("/patient/home");
            }
            // response.status(httpStatus.StatusCodes.OK).json({
            //     message: "User Logged In Successfully",
            //     token: token,
            // });
        } else {
            response.setHeader("Content-Type", "text/html");
            response.app.set("wrongCredentials", true);
            response.redirect("/signin");     
        }
    } catch (error) {
        response.setHeader("Content-Type", "text/html");
        response.app.set("wrongCredentials", true);
        response.redirect("/signin");
        
        // response.status(httpStatus.StatusCodes.BAD_REQUEST).json({
        //     message: error.message
        // })
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
            type: request.body.type,
        };

        return newUser;

    } catch (error) {
        throw error;
    }
}