import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().trim().min(1).pattern(/^[0-9A-Za-zÀ-úç'\s]+$/).required(),
    youtubeLink: Joi.string().min(1).required()
});

export {schema};