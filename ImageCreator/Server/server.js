import * as dotenv from "dotenv"

import { Configuration, OpenAIApi } from 'openai';

import cors from 'cors';
import express from 'express';

dotenv.config(); // to access .env file

const configuration = new Configuration({
  apiKey: process.env.OPENAI, // OPENAI key in .env file
});

const openai = new OpenAIApi(configuration); // the openAI API

const app = express();
app.use(cors()); // security mechanism of cross version resource sharing
app.use(express.json()); // only handle json format incoming data

app.post('/dream', async (req, res) => {
  try {
    // retrive users image requirement prompt
    const prompt = req.body.prompt;

    // get openai response
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });
        
    // sending response
    const image = aiResponse.data.data[0].url;
    res.send({ image });
    
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

// start to run the server on port 8080
app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));