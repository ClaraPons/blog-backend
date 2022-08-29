const express = require('express')
const app = express('')
const fs = require('fs')
const moment = require('moment')
const { body, validationResult } = require("express-validator")

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

app.post('/',
    body('title').exists().withMessage('You have to add a title to your article'), 
    body('content').isLength({ min: 5}).withMessage('Your article is too short'),
    body('author').exists().withMessage('You have to add an author'),
    (req, res) => {

    const { errors } = validationResult(req)

    const article = {...req.body,
        date: moment().format('MMMM Do YYYY, h:mm:ss')
        }


        if(errors.length > 0) {
            res.status(400).json(errors)
        }else{
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
        }

    // res.json('ok')

})


module.exports = app