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
        // start counting Performance time
        const startTime = performance.now();
        const { sentence, words, placeholder } = req.body;

        // Implement scramble logic
        let replace;
        if (placeholder === 'asterisks') {
            replace = "****";
        } else if (placeholder === 'questionMark') {
            replace = "????";
        } else if (placeholder === 'dashes') {
            replace = "----";
        }

        // Split the words string into an array of individual words
        const wordsToReplace = words.split(' ');

        // Replace each word individually using a loop
        let redactedContent = sentence;
        wordsToReplace.forEach(word => {
            redactedContent = redactedContent.split(word).join(replace);
        });

        // Calculate statistics
        const wordsScanned = sentence.split(/\s+/).length;

        let wordsRedacted = 0;
        wordsToReplace.forEach(word => {
            wordsRedacted += (sentence.split(word).length - 1);
        });

        const charactersRedacted = redactedContent.length - sentence.length;

        // Get performance time
        const endTime = performance.now();
        let timeTaken = endTime - startTime;
        // Truncate the timeTaken to 3 decimal places
        timeTaken = timeTaken.toPrecision(3);

        // Render the view with the redacted content and statistics
        res.render('redart', {
            redactedContent,
            originalContent: sentence,
            stats: {
                wordsScanned,
                wordsRedacted,
                charactersRedacted,
                timeTaken
            }
        });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})