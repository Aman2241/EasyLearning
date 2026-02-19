import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/execute', async (req, res) => {
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
