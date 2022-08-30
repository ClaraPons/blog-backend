const fs = require('fs')
const slugify = require('slugify')

const checkIfExists = (req, res, next) => {

    fs.readFile('./article.json', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }else{
            const articles = JSON.parse(data.toString())
            const articlesFind = articles.find((article) => article.slug === req.params.slug)

            if(articlesFind) {
                req.articlesFind = articlesFind
                next()
            }else{
                res.status(404).json("Article not found")
            }
        }
    })
}

const checkIfNotExists = (req, res, next) => {
    const slug = slugify(req.body.title, {lower: true})

    fs.readFile('./article.json', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }else{
            const articles = JSON.parse(data.toString())
            const articlesFind = articles.find((article) => article.slug === slug)

            if(!articlesFind) {
                req.slug = slug
                next()
            }else{
                res.status(404).json("Article already exist")
            }
        }
    })
}

const checkIfCatExist = (req, res, next) => {
    fs.readFile('./category.json', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }else{
            const categories = JSON.parse(data.toString())
            const categoriesFind = categories.find((category) => category.slug === req.body.category)

            if(categoriesFind) {
                next()
            }else{
                res.status(404).json("Category not found")
            }
        }
    })
}

module.exports = {
    checkIfExists,
    checkIfNotExists, 
    checkIfCatExist
}