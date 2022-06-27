import { Joi } from "celebrate";

const addScheduleSchema = Joi.object().keys({
    hourFrom: Joi.string(),
    hourTo: Joi.string(),
    day: Joi.string(),
    dayFrom: Joi.string(),
    dayTo: Joi.string(),
    userId: Joi.number().required(),
});

const bookScheduleSchema = Joi.object().keys({
    patientId: Joi.number().required(),
});

export {
    addScheduleSchema,
    bookScheduleSchema,
};