const express = require('express')
const conn = require('./../db')
const router = express.Router()

router.get('/', function(req, res){
    let query = `select * from clientes;`  
    conn.query(query, function(err, result){
        if(err) console.log(err)
        res.render('index', {
            title: 'NewBorn Controle de Clientes',
            data: result
        })
    })
})

module.exports = router