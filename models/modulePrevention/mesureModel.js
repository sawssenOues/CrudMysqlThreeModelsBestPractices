const mongoose = require('mongoose')
const Joi = require('joi');

const mesureSchema = mongoose.Schema(
    {
        description: { type: String },
        risqueRelated: { type: mongoose.Schema.Types.ObjectId, ref: 'risque'}
    },
    {
        timestamps: true // this is used to track data when it was saved in db
    }
)




module.exports = mongoose.model('mesure', mesureSchema);

let mesure_validation = Joi.object({
    description: Joi.string().min(3).required()
});

module.exports.mesure_validation = mesure_validation;