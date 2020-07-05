const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET Routes
router.get('/api/hello', (req, res) => {
    res.json({ express: "Hello World" });
});

router.get('/api/test', (req, res) => {
    pool.query('SELECT * FROM test', (qErr, qRes) => {
        res.json(qRes.rows);
    });
});

router.get('/api/getPostList', (req, res) => {
    pool.query('SELECT pid, title, date_created FROM posts', (qErr, qRes) => {
        res.json(qRes.rows);
    });
});

// POST Routes
router.post('/api/submit', (req, res) => {
    pool.query('SELECT * FROM posts WHERE title=$1',
        [req.body.title],
        (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            }

            if (data.rows && data.rows.length > 0) {
                res.status(400).send("There is already a post with this title. Check to see that you are not submitting an already created post");
            } else {
                const values = [
                    req.body.title,
                    req.body.content
                ];

                pool.query('INSERT INTO posts(title, body, date_created) VALUES($1, $2, NOW())',
                    values,
                    (qErr, qRes) => {
                        if (qErr) {
                            console.log(qErr);
                        }
                        console.log("Insert successful");
                        res.json(qRes.rows);
                    });
            }
        });
});

module.exports = router