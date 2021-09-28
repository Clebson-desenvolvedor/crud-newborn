const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const ejs = require('ejs')
const indexRouter = require('./router/index')
const app = express()

app.listen('5000', function(err){
    if(err) console.log(err)
    console.log('escutando na porta 5000')
})

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', indexRouter)
app.use(express.static('public'))