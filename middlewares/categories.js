const fs = require('fs')
const slugify = require('slugify')

const checkIfExists = (req, res, next) =>{
    
    fs.readFile('./category.json', (err, data) => {
        if(err){
            console.log(err);
            return
        }else{
           const categories = JSON.parse(data.toString())
           const categoryFind = categories.find((category) => {
               return category.slug === req.params.slug
           })

           if (categoryFind) {
               req.categoryFind = categoryFind
               next()
           }else{
                res.status(404).json(`Category isn't exist` )
           }
        }
    })
    
}

const checkIsNotExist = (req, res, next) => {
    const slug = slugify(req.body.name, { lower: true })


    fs.readFile('./category.json', (err, data) => {
      if (err) {
        res.status(500).json('Internal server error')
      } else {
        const categories = JSON.parse(data.toString())
        const category = categories.find(category => category.slug === slug)
  
        console.log(categories);

        if (!category) {
          req.categorySlug = slug
          req.categories = categories
          next()
        } else {
          res.status(409).json('Category already exists')
        }
      }
    })
}

module.exports = {
    checkIfExists, checkIsNotExist
}