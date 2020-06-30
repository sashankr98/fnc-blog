const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan(':method :url :status - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.json({ express: "Hello World" });
});

if (process.env.NODE_ENV === 'production') {
    console.log("Production Environment");
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));// Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port: ${port}`));