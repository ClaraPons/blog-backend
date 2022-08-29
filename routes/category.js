const express = require('express')
const app = express('')
const fs = require('fs')

app.get('/', (req, res) => {

    fs.readFile('./category.json', (err, data) => {
        if(err){
            console.log(err);
            return
        }else{
            res.json(JSON.parse(data.toString()))
        }
    })
})

app.post('/', (req, res) =>{
    const category = { ...req.body }

    fs.readFile('./category.json', (err, data) => {
        if(err){
            console.log(err);
            return
        }else{
            const categories = JSON.parse(data.toString())
            categories.push(category)
            // res.json(categories)

            fs.writeFile('./category.json', JSON.stringify(categories), err => {
                console.log(err);
            })
        }
    })
    res.json('ok')
})


module.exports = app