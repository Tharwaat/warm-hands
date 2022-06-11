import * as express from "express";
import * as authValidation from "../auth/auth.middlewares";
import * as userController from "../user/user.controller";

export const userRoutes = express.Router();

userRoutes.route("/update")
.put(  
    authValidation.validateAccessTokenHeader,
    authValidation.verifyAccessToken,
    userController.update
);