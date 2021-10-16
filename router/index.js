const express = require('express')
const conn = require('./../db')
const router = express.Router()
const moment = require('moment')

router.get('/', function (req, res) {
    let query = `SELECT * FROM clientes limit 10;`
    conn.query(query, function (err, result) {
        if (err) console.log(err)
        res.render('index', {
            title: 'NewBorn Controle de Clientes',
            data: result,
            moment: moment
        })
    })
})

router.get('/add', function (req, res) {
    res.render('add', {
        title: 'Newborn - Criar contato'
    })
})

router.post('/save', function (req, res) {
    let data_nasc = moment(req.body.data_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let data = [
        req.body.nome_mae,
        req.body.sobrenome,
        req.body.whatsapp,
        req.body.nome_bebe,
        data_nasc,
        req.body.sexo
    ]

    let query = `insert into clientes (nome_mae, sobrenome, whatsapp, nome_bebe, data_nasc, sexo) VALUES (?,?,?,?,?,?);`

    conn.query(query, data, function (err, result) {
        if (err) console.log(err)
        res.redirect('/')
        console.log(result)
    })
})

router.get('/del/:id', function(req, res){
    let query = `delete from clientes where id = ${req.params.id}`
    conn.query(query, function(err, result) {
        if(err) console.log(err)
        res.redirect('/')
    })
})

router.get('/edit/:id', function(req, res) {
    let query = `select * from clientes where id = ${req.params.id}`
    conn.query(query, function(err, result) {
        if(err) console.log(err)
        res.render('edit', {
            title: 'Newborn - Editando Cliente',
            cliente: result[0],
            moment: moment
        })
    })
})

router.post('/updated', function(req, res) {
    let data_nasc = moment(req.body.data_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let query = `update clientes set nome_mae = '${req.body.nome_mae}', sobrenome = '${req.body.sobrenome}',
    whatsapp = '${req.body.whatsapp}', nome_bebe = '${req.body.nome_bebe}', data_nasc = '${data_nasc}',
    sexo = '${req.body.sexo}' where id = ${req.body.id}`
    conn.query(query, function(err, result) {
        if(err) console.log(err)
        res.redirect('/')
    })
})

module.exports = router