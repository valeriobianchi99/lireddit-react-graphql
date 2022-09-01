import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
    // The home page html
    res.send(`
        <h2 style="margin: 10px; text-align: center;">Hello, welcome to the Express server home page</h2>
    `)
});

export default router;