const mongoose = require('mongoose')


const domaineSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String }
    },
    {
        timestamps: true // this is used to track data when it was saved in db
    }
)

module.exports = mongoose.model('domaine', domaineSchema);
const Joi = require('joi');
let domaine_validation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required()
});

module.exports.domaine_validation = domaine_validation;