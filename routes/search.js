const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

// --------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
    res.end()
});

// Searching products
router.post('/', (req, res) => {
    console.log(`POST /api/search  req.body: \n`, req.body);
    if (req.body.Name === undefined) {
        res.sendStatus(404);
    } else {
        searchTable('WestBuy', 'Products', 'Name', req.body.Name, true)
            .then(result => {
                console.log('result: ', result);
                res.send(result);
            })
            .catch(error => {
                res.sendStatus(500);
            });
    }
});


module.exports = router;

