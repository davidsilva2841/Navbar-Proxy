const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

router.get('/', (req, res) => {
	res.send('received');
});

// Searching products
router.post('/', (req, res) => {
    if (req.body.Name === undefined) {
        res.sendStatus(404);
    } else {
        searchTable('WestBuy', 'Products', 'Name', req.body.Name, true)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.sendStatus(500);
            });
    }
});


module.exports = router;

