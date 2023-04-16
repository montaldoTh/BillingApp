const BillModel = require('../model/Bills.js')

const getItems = (req, res) => {
    BillModel.find().then((bills)=>{
        res.status(201).json(bills)
    }).catch(err => res.status(400).json({ err }))
}

const getLimitedItems = (req, res) => {
    const limit = parseInt(req.params.limit)
    const start = parseInt(req.query.start) || 0
    if(isNaN(limit) || isNaN(start) || limit <= 0 || start < 0){
        return res.status(400).json({ message : `Invalid Parameter limit`})
    }
    BillModel.find().skip(start).limit(limit).then((bills)=>{
        res.status(201).json(bills)
    }).catch(err => res.status(400).json({ err }))
}

const getItem = (req, res) => {
    const id = req.params.id
    BillModel.findOne({_id: id}).then((bill)=>{
        res.status(201).json(bill)
    }).catch(err => res.status(400).json({ err }))
}

const patchItem = (req, res) => {
    const id = req.params.id
    const updatedBill = req.body
    BillModel.updateOne({_id: id}, { ...updatedBill}).then((bill)=>{
        res.status(201).json(bill)
    }).catch(err => res.status(400).json({ err }))
}

const postItem = (req, res) => {
    const newBill = req.body
    if(!newBill.billnum || !newBill.date || !newBill.client){
        return res.status(400).json({error: 'Les paramètres, billnum, date & client'});
    }
    const bill = new BillModel({ ...newBill})
    bill.save().then(()=>{
        res.status(200).json(bill)
    }).catch(err => res.status(400).json({ err }))
}

const deleteItem = (req, res) => {
    const id = req.params.id
    BillModel.deleteOne({_id: id}).then(()=>{
        res.sendStatus(204)
    }).catch(err => res.status(400).json({ err }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem, getLimitedItems }