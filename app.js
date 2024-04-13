const express = require('express')
const ejs = require("ejs")
const PORT = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.set("views", "views")

app.get('/', (req, res) =>{
    // console.log('index')
    res.render('index')
})

app.post('/redact', (req, res) =>{
   try {
    const {sentence, words, replace} = req.body

    res.render('redart', { redactedContent: words, originalContent:sentence });

   } catch (error) {
    
   }
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})