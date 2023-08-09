
const express = require('express');


const domaineRoutes = require('../controllers/modulePrevention/domaineController');
const risqueRoutes = require('../controllers/modulePrevention/risqueController');
const mesureRoutes = require('../controllers/modulePrevention/mesureController');

const router = express.Router();


// Route handling
router.use('/Domaines', domaineRoutes); // final route is /Domaines+ "controller suffix" exp /Domaines/for get tous controller
router.use('/Domaines', risqueRoutes); // final route is /Risques+ "controller suffix" exp /Risques/for get tous controller router.use('/Domaines/:id/Risques/:id-r', risqueRoutes)
router.use('/Domaines', mesureRoutes);   // final route is /Mesures+ "controller suffix" exp /Mesures/for get tous controller



module.exports = router
