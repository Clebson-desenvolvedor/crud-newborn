const express = require('express')
const conn = require('./../db')
const router = express.Router()
const moment = require('moment')

router.get('/', function (req, res) {
    let query = `SELECT * FROM tb_clientes limit 10;`
    conn.query(query, function (err, result) {
        if (err) console.log(err)
        res.render('index', {
            title: 'Sistema de Gerenciamento By Emotion',
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

    let query = `insert into tb_clientes (nome, sobrenome, whatsapp, clientedesde) VALUES (?,?,?,?);`

    conn.query(query, data, function (err, result) {
        if (err) console.log(err)
        res.redirect('/')
        console.log(result)
    })
})

router.get('/del/:idcliente', function(req, res){
    let query = `delete from tb_clientes where idcliente = ${req.params.idcliente}`
    conn.query(query, function(err, result) {
        if(err) console.log(err)
        res.redirect('/')
    })
})

router.get('/edit/:id', function(req, res) {
    let query = `select * from tb_clientes where idcliente = ${req.params.id}`
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
    let clientedesde = moment(req.body.clientedesde, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let query = `update tb_clientes set nome = '${req.body.nome}', sobrenome = '${req.body.sobrenome}',
    whatsapp = '${req.body.whatsapp}', clientedesde = '${clientedesde}'
    where idcliente = ${req.body.idcliente}`
    conn.query(query, function(err, result) {
        if(err) console.log(err)
        res.redirect('/')
    })
})

module.exports = router