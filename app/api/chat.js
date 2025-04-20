import express from 'express';
import Groq from 'groq-sdk';

const app = express();
const port = 3000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: userMessage }],
            model: 'llama-3.3-70b-versatile',
        });

        res.json({ response: chatCompletion.choices[0]?.message?.content || 'No response' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});