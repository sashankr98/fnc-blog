const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/api/hello', (req, res) => {
    res.json({ express: "Hello World" });
});

router.get('/api/test', (req, res) => {
    pool.query('SELECT * FROM test', (qErr, qRes) => {
        res.json(qRes.rows);
    });
})

module.exports = router