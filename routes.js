const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET Routes
router.get('/api/hello', (req, res) => {
    res.json({ express: 'Hello World' });
});

router.get('/api/test', (req, res) => {
    pool.query('SELECT * FROM test', (qErr, qRes) => {
        res.json(qRes.rows);
    });
});

router.get('/api/star', (req, res) => {
    pool.query('SELECT * FROM posts', (qErr, qRes) => {
        res.json(qRes.rows);
    })
})

router.get('/api/getPostList', (req, res) => {
    pool.query('SELECT pid, title, date_created FROM posts ORDER BY date_created DESC', (qErr, qRes) => {
        res.json(qRes.rows);
    });
});

router.get('/api/getPost', (req, res) => {
    pool.query('SELECT title, body FROM posts WHERE pid=$1',
        [req.query.pid],
        (qErr, qRes) => {
            if (qErr) {
                console.log(qErr);
                res.json(qErr);
            }

            res.json(qRes.rows);
        });
});

// Private Routes
router.post('/api/submit', (req, res) => {
    pool.query('SELECT * FROM posts WHERE title=$1',
        [req.body.title],
        (err, data) => {
            if (err) {
                console.log(err);
                res.json(err);
            }

            if (data.rows && data.rows.length > 0) {
                res.status(400).send('There is already a post with this title. Check to see that you are not submitting an already created post');
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
                            res.json(err);
                        }
                        console.log('Insert successful');
                        res.json(qRes.rows);
                    });
            }
        });
});

router.put('/api/updatePost', (req, res) => {
    const values = [
        req.body.title,
        req.body.content,
        req.body.pid
    ];
    pool.query('UPDATE posts SET title=$1, body=$2 WHERE pid=$3',
        values,
        (qErr, qRes) => {
            if (qErr) {
                console.log(qErr);
                res.json(err);
            }
            console.log('Update successful');
            res.json(qRes);
        });
});

router.delete('/api/deletePost', (req, res) => {
    pool.query('DELETE FROM posts WHERE pid=$1', [req.body.pid],
        (qErr, qRes) => {
            if (qErr) {
                console.log(qErr);
                res.json(qErr);
            }
            console.log('Delete successful');
            res.json(qRes.rows);
        });
});

module.exports = router;
