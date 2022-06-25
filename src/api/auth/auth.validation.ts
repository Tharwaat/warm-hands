import { Joi } from "celebrate";

const userRegistrationSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    country: Joi.string().required(),
    gender: Joi.string().required(),
    birthDate: Joi.string(),
    age: Joi.number().required(),
    password: Joi.string().required().min(6),
    email: Joi.string().required(),
    type: Joi.string().required().valid(["daycare", "caregiver", "patient", "volunteer"]),
    rateAmount: Joi.number().required(),
    experience: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().min(6),
    button: Joi.string()
});

const tokenValidationSchema = Joi.object().keys({
    access_token: Joi.string().required(),
});

export {
    userRegistrationSchema,
    loginSchema,
    tokenValidationSchema,
};