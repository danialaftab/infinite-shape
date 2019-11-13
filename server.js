const express = require('express')
const functions = require('./functions')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.get('/draw', (req, res) => {
    let {height, width, padding} = req.query
    if(functions.isInputValid(height, width, padding)){
        res.send(functions.draw(width, height, padding))
    } else {
        res.send({status: 'error', message: 'insufficient/incorrect params'})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))