const express = require('express')
const app = express('')
const fs = require('fs')
const moment = require('moment')
const { body, validationResult } = require("express-validator")
const { checkIfExists, checkIfNotExists, checkIfCatExist } = require('../middlewares/article')

app.get('/', (req, res) => {

    fs.readFile('./article.json', (err, data) => {
        if(err){
            console.log(err);
            res.status(500).json(err)
            return
        }else{
            const articles = JSON.parse(data.toString());
            res.json(articles)
        }
    })

})


app.get('/:slug', checkIfExists, (req, res) => {
    res.json(req.articlesFind)
})


app.post('/',
    body('title').isLength({ min: 2}).withMessage('Your title is too short'), 
    body('content').isLength({ min: 5}).withMessage('Your article is too short'),
    body('author').isLength({ min: 2}).withMessage('You have to add an author'),
    checkIfCatExist, checkIfNotExists,
    (req, res) => {

    const { errors } = validationResult(req)

    const article = { ...req.body,
        date: moment().format('MMMM Do YYYY, h:mm:ss'),
        slug: req.slug
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
        
                    fs.writeFile('./article.json', JSON.stringify(articles), err => {
                        if(err) {
                            res.status(500).json(err)
                        } else{
                            res.json(article) 
                        }
                      })
                }
            })
        }
})


module.exports = app