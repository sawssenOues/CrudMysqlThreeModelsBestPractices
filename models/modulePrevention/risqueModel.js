const mongoose = require('mongoose')
const Joi = require('joi');

const risqueSchema = mongoose.Schema(
    {
        description: { type: String },
        domaineRelated: { type: mongoose.Schema.Types.ObjectId, ref: 'domaine'}
    },
    {
        timestamps: true // this is used to track data when it was saved in db
    }
)




module.exports = mongoose.model('risque', risqueSchema);

let risque_validation = Joi.object({
    description: Joi.string().min(3).required()
});

module.exports.risque_validation = risque_validation;