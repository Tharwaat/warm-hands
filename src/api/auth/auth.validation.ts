import { Joi } from "celebrate";

const userRegistrationSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    countryCode: Joi.string(),
    gender: Joi.string(),
    birthDate: Joi.string(),
    avatar: Joi.string(),
    password: Joi.string().required().min(6),
    email: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().min(6),
});

const createStatusSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    status: Joi.string().required().valid(["online", "offline", "idle"]),
    accessToken: Joi.string(),
});

export {
    userRegistrationSchema,
    loginSchema,
    createStatusSchema,
};