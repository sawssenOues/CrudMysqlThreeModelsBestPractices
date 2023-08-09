
const express = require('express')
const router = express.Router()

const RisqueModel = require('../../models/modulePrevention/RisqueModel')
const domaineModel = require('../../models/modulePrevention/domaineModel')
const { risque_validation } = require('../../models/modulePrevention/RisqueModel');

const { generateCrudMethods } = require('../../services/crudcommonServices')
const RisqueCrud = generateCrudMethods(RisqueModel)

const { validateDbId, raiseRecord404Error, schema_validation, checkIfidExists } = require('../../middlewares/index');


router.get('/:id/Risques', validateDbId('id'), async (req, res, next) => { //tous
    const domaineId = req.params.id;
    checkIfidExists(domaineModel, domaineId).then(() => RisqueCrud.getAllBydomaineRelated(domaineId))
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

})

router.post('/:id/Risques/ajoutRisque', schema_validation(risque_validation), (req, res, next) => {
    const domaineId = req.params.id;
    const risqueData = { ...req.body, domaineRelated: domaineId }
    checkIfidExists(domaineModel, domaineId).then(() => RisqueCrud.create(risqueData))
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.get('/:id/Risques/:idr', validateDbId('id'), validateDbId('idr'), (req, res, next) => {
    const domaineId = req.params.id;
    checkIfidExists(domaineModel, domaineId).then(() =>RisqueCrud.getById(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})


router.put('/:id/Risques/update/:idr', validateDbId('id'),validateDbId('idr'),  schema_validation(risque_validation), (req, res) => {
    const domaineId = req.params.id;
    checkIfidExists(domaineModel, domaineId).then(() =>RisqueCrud.update(req.params.idr, req.body))
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/:id/Risques/delete/:idr', validateDbId('id'),validateDbId('idr'),  (req, res) => {
    const domaineId = req.params.id;
    checkIfidExists(domaineModel, domaineId).then(() =>RisqueCrud.delete(req.params.idr))
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router