const express = require('express')
const app = express('')
const fs = require('fs')
const { checkIfExists, checkIsNotExist } = require('../middlewares/categories')
const { body, validationResult } = require('express-validator')

app.get('/', (req, res) => {

    fs.readFile('./category.json', (err, data) => {
        if(err){
            console.log(err)
            return
        }else{
            res.json(JSON.parse(data.toString()))
            // console.log(JSON.parse(data.toString()));
        }
    })
})

app.post('/',
    body('name').isLength({min: 4}).withMessage('Category name is too short'),
    body('description').isLength({min: 20}).withMessage('Category description is too short'),
    checkIsNotExist,
    (req, res) =>{

    const { errors } = validationResult(req)
    console.log(errors);

    if (errors) {
        res.status(400).json(errors)
    }else {

    }

    const category = { 
        name: req.body.name,
        description: req.body.description,
        slug: req.categorySlug
    }

    const categories = [...req.categories, category]

    fs.writeFile('./category.json', JSON.stringify(categories), err => {
      if (err) {
        res.status(500).json('Internal server error')
      } else {
        res.json(category)
      }
    })
  }
)

app.get('/:slug', checkIfExists, (req, res) => {
    const categoryFind = { ... req.categoryFind,
        articles: []
    }

    fs.readFile('./article.json', (err, data) => {
        if(err) {
            res.status(500).json(err)
        }else{
            const articles = JSON.parse(data.toString())
            const articleFilter = articles.filter(article => article.category === categoryFind.slug)

            categoryFind.articles = articleFilter

            res.json(categoryFind)
        }
    })

})


module.exports = app