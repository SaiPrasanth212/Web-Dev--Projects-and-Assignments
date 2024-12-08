
const express = require('express');

const formRouter = require('../controller/form')

const router = express.Router();

router.get('/', formRouter.showForm);

router.post('/submit-form', formRouter.submitForm);

router.get('/getAllUsers',formRouter.getAllUsers)

router.delete('/remove/:id',formRouter.removeUserById)

module.exports = router;