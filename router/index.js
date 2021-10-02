const express = require('express')
const conn = require('./../db')
const router = express.Router()
const moment = require('moment')

router.get('/', function(req, res){
    let query = `SELECT * FROM clientes limit 5;`
    conn.query(query, function(err, result){
        if(err) console.log(err)
        res.render('index', {
            title: 'NewBorn Controle de Clientes',
            data: result,
            moment: moment
        })
    })
})

module.exports = router