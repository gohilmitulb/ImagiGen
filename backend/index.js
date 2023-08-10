const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config();
const cors = require('cors');

const app = express();
const configuration = new Configuration({
    apiKey: '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'
});
const openai = new OpenAIApi(configuration)
const port = 1000
app.use(cors())
app.use(express.json());

app.post('/api/imggen', async (req, res) => {
    const prompt = req.body.input
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const img = response.data.data[0].url
        res.json({ imgURL: img });
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`server started http://localhost:${port}`)
})