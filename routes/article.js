const express = require('express')
const app = express('')
const fs = require('fs')
const moment = require('moment')

app.get('/', (req, res) => {

    fs.readFile('./article.json', (err, data) => {
        if(err){
            console.log(err);
            return
        }else{
            const articles = JSON.parse(data.toString());
            res.json(articles)
        }
    })

})

app.post('/', (req, res) => {
    const article = {...req.body,
    date: moment().format('MMMM Do YYYY, h:mm:ss')
    }
   

    fs.readFile('./article.json', (err, data) => {
        if(err){
            console.log(err);
            return
        }else{
            const articles = JSON.parse(data.toString());
            articles.push(article)
            res.json(articles)

            fs.writeFile('./article.json', JSON.stringify(articles), err => {
                console.log(err)
              })
        }
    })

    res.json('ok')

})


module.exports = app