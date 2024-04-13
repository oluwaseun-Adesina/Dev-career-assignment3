const express = require('express')
const ejs = require("ejs")
const PORT = 4000

const app = express()

app.use(express.json())
app.set("view engine", "ejs")

app.set("views", "views")

app.get('/', (req, res) =>{
    console.log('index')
    res.render('index')
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})