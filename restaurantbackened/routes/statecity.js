var express = require('express');
var router = express.Router();
var pool = require('./pool');


router.get('/fetch_all_states', function(req, res, next) {
    try {
        pool.query('SELECT * FROM states', function(err, result) {
            if(err)
            {
                console.log(err);
                res.status(200).json({ status: false, message: 'Database error', data: [] });
            }
             else
            {
                res.status(200).json({ status: true, message: 'Success', data: result });
            }
        });
    } 
    catch (e) 
    {
        res.status(200).json({ status: false, message: 'Internal server error', data: [] });
    }
});

router.post('/fetch_all_cities', function(req, res, next) {
    try {
        pool.query("SELECT * FROM city where stateid=?",[req.body.stateid], function(err,result) {
            if(err)
            {
                console.log(err);
                res.status(200).json({ status: false, message: 'Database error', data: [] });
            }
             else
            {
                res.status(200).json({ status: true, message: 'Success', data: result });
            }
        });
    } 
    catch (e) 
    {
        res.status(200).json({ status: false, message: 'Internal server error', data: [] });
    }
});

module.exports = router;