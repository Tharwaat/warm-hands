import { Joi } from "celebrate";

const addScheduleSchema = Joi.object().keys({
    hourFrom: Joi.string().required(),
    hourTo: Joi.string().required(),
    day: Joi.string().required(),
    userId: Joi.number().required(),
});

export {
    addScheduleSchema,
};