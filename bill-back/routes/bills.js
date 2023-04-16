// Init
const express = require('express')
const billsRouter = express.Router()
const ctrl = require('../controllers/bills')
const verifyParams = require('../middleware/verifyParams')

//Routes
billsRouter.get('/', ctrl.getItems)
billsRouter.get('/limited/:limit', ctrl.getLimitedItems)
billsRouter.get('/:id', verifyParams, ctrl.getItem)
billsRouter.post('/', ctrl.postItem)
billsRouter.patch('/:id', verifyParams, ctrl.patchItem)
billsRouter.delete('/:id', verifyParams, ctrl.deleteItem)

module.exports = billsRouter