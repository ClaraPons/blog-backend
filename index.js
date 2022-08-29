const express = require('express')
const app = express()
const port = 5007
const cors = require('cors')
const morgan = require('morgan')
const getArticle = require('./routes/article')
const getCategory = require('./routes/category')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/article', getArticle)
app.use('/category', getCategory)

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})