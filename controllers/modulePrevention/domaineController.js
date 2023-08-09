const express = require('express')
const router = express.Router()

const DomaineModel = require('../../models/modulePrevention/domaineModel')
const {domaine_validation} = require('../../models/modulePrevention/domaineModel');

const { generateCrudMethods } = require('../../services/crudcommonServices')
const domaineCrud = generateCrudMethods(DomaineModel)

const { validateDbId , raiseRecord404Error, schema_validation } = require('../../middlewares/index');



router.get('/', (req, res, next) => { //tous
    domaineCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.post('/ajoutDomaine', schema_validation(domaine_validation), (req, res, next) => {
   
    domaineCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId('id') , (req, res, next) => {
    domaineCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})


router.put('/update/:id', validateDbId('id'), schema_validation(domaine_validation), (req, res) => {
    domaineCrud.update(req.params.id, req.body)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/delete/:id', validateDbId('id'), (req, res) => {
    domaineCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

module.exports = router