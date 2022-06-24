import * as express from "express";
import * as scheduleValidation from "./schedule.middlewares";
import * as scheduleController from "./schedule.controller";
import { verifyAccessToken } from "../auth/auth.middlewares";

export const scheduleRoutes = express.Router();

scheduleRoutes.route("/")
.post(
    verifyAccessToken,
    scheduleValidation.validateAddScheduleRequestBody,
    scheduleController.addSchedule,
);

scheduleRoutes.route("/:scheduleId")
.delete(
    verifyAccessToken,
    scheduleController.deleteSchedule,
);

scheduleRoutes.route("/")
.get(
    verifyAccessToken,
    scheduleController.fetchSchedule,
);

scheduleRoutes.route("/book/:scheduleId")
.post(
    verifyAccessToken,
    scheduleValidation.validateBookScheduleRequestBody,
    scheduleController.bookSchedule,
);
