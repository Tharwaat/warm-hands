import * as express from "express";
import * as authController from "../auth/auth.controller";
import * as validation from "../auth/auth.middlewares";

export const authRoutes = express.Router();

authRoutes.route("/register")
.post(  
    validation.validateNewUserRequestBody,
    authController.register
);