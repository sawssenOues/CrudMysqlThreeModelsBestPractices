const express = require('express')
const router = express.Router()

const MesureModel = require('../../models/modulePrevention/mesureModel')
const {mesure_validation} = require('../../models/modulePrevention/mesureModel');

const { generateCrudMethods } = require('../../services/crudcommonServices')
const MesureCrud = generateCrudMethods(MesureModel)

const { validateDbId , raiseRecord404Error, schema_validation } = require('../../middlewares/index');



router.get('/', (req, res, next) => { //tous
    MesureCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.post('/ajoutMesure',schema_validation(mesure_validation), (req, res, next) => {
   
    MesureCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId('id') , (req, res, next) => {
    MesureCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})


router.put('/update/:id', validateDbId('id'),schema_validation(mesure_validation), (req, res) => {
    MesureCrud.update(req.params.id, req.body)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/delete/:id', validateDbId('id'), (req, res) => {
    MesureCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router