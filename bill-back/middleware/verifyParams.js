const verifyParams = (req, res, next) => {
    console.log(req.params)
    if(!req.params.id){
        res.status(400).json({ error: 'Le paramètre {id} est manquant.'})
    } else {
        req.foo='bar'
        next()
    }
        
}

module.exports= verifyParams