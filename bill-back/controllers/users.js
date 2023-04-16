const UserModel = require('../model/Users.js')

const getItems = (req, res) => {
    UserModel.find().then((users)=>{
        res.status(201).json(users)
    }).catch(err => res.status(400).json({ err }))
}

const getLimitedItems = (req, res) => {
    const limit = parseInt(req.params.limit)
    const start = parseInt(req.query.start) || 0
    if(isNaN(limit) || isNaN(start) || limit <= 0 || start < 0){
        console.log(typeof start);
        return res.status(400).json({ message : `Invalid Parameter limit`})
    }
    UserModel.find().skip(start).limit(limit).then((user)=>{
        res.status(201).json(user)
    }).catch(err => res.status(400).json({ err }))
}

const getItem = (req, res) => {
    const id = req.params.id
    UserModel.findOne({_id: id}).then((users)=>{
        res.status(201).json(users)
    }).catch(err => res.status(400).json({ err }))
}

const patchItem = (req, res) => {
    const id = req.params.id
    const updatedUser = req.body
    UserModel.updateOne({_id: id}, { ...updatedUser}).then((user)=>{
        res.status(201).json(user)
    }).catch(err => res.status(400).json({ err }))
}

const postItem = (req, res) => {
    const newUser = req.body
    if(!newUser.regDate || !newUser.enterprise){
        return res.status(400).json({error: "Il est obligatoire de renseigner Date d'enregistrement ou/et une entreprise"})
    }
    const user = new UserModel({ ...newUser})
    user.save().then(()=>{
        res.status(200).json(user)
    }).catch(err => res.status(400).json({ err }))
}

const deleteItem = (req, res) => {
    const id = req.params.id
    UserModel.deleteOne({_id: id}).then((users)=>{
        res.status(204).json(users)
    }).catch(err => res.status(400).json({ err }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem, getLimitedItems }