const express = require('express')
const usersRouter = express.Router()
const ctrl = require('../controllers/users')

usersRouter.get('/', ctrl.getItems)
usersRouter.get('/limited/:limit', ctrl.getLimitedItems)
usersRouter.get('/:id', ctrl.getItem)
usersRouter.post('/', ctrl.postItem)
usersRouter.patch('/:id', ctrl.patchItem)
usersRouter.delete('/:id', ctrl.deleteItem)

module.exports = usersRouter