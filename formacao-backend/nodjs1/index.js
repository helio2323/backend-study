const api = require('./api')
const localStorage = require('localStorage')

const express = require("express");

const server = express();

server.use(express.json())

server.listen(3000)

server.get('/first', (req, res) => {
    return res.send({first: 'Devmon'})
})

server.get('/query-params', (req, res) =>{
    const {name, age} = req.query;

    return res.json({result: `Nome: ${name} e idade: ${age}`})
})

var products = []

// INSERT
server.post('/products', (req, res) => {
    const {id, name, price} = req.body

    products.push({id: id, name: name, price: price})
    res.send({message: 'Success!'})
})

server.get('/products', (req, res) => {
    return res.json({produtos: products})
})

//UPDATE
server.put('/products', (req, res) => {
    const {name, price} = req.body
    const {oldName} = req.query

    const index = products.findIndex(item => item.name === oldName)

    products[index].name = name;
    products[index].price = price;
    res.send({message: 'Success!'})
})

// DELETE
server.delete('/products/:id', (req, res) =>{
    const {id} = req.params

    const newProducts = products.filter(item => item.id !== parseInt(id))

    products = newProducts

    res.send({product: products})
})

server.get('/pokemon', async(req, res) => {

    try {
        const { status, data} = await api.get('pokemon/1')
        return res.json({name: data.name})
    }catch(error){
        res.send({error: error})
    }

})

//MIDDLEWARES

function verifyUserAlready(req, res, next) {
    const {email} = req.body

    if (!allUsers.find(user => user.email === email)) {
        return next();
    }

    return res.status(400).json({failed: 'This email alred register'})
}

const allUsers = [];

server.post('/register-users', verifyUserAlready, (req, res) => {
    const user = req.body

    allUsers.push(user)

    localStorage.setItem('users', JSON.stringify(allUsers))

    return res.json({user})
})

server.get('/users', (req, res) => {

    const users = JSON.parse(localStorage.getItem('users'))

    return res.json(users)
})


