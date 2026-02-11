import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST.' });
    }

    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid input, prompt is required.' });
    }

    try {
        // Example of calling an external API, replace with actual API logic
        const response = await fetch('https://api.gemini.com/v1/your-endpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate response');
        }

        const data = await response.json();
        res.status(200).json({ html: data.html });
    } catch (error) {
        console.error('Error generating HTML:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}