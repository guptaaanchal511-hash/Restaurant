var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/restaurant_submit', upload.any(), function(req, res, next) {
    pool.query("INSERT INTO restaurants(restaurantname, ownername, phonenumber, mobileno, url, fssai, gstno, gsttype, emailid, filefssai, fileshopact, address, filelogo, stateid, cityid, createat, updateat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
         [req.body.restaurantname,req.body.ownername,req.body.phonenumber,req.body.mobileno,req.body.url,req.body.fssai,req.body.gstno,req.body.gsttype,req.body.emailid,req.files.find((f) => f.fieldname === 'filefssai')?.filename || null,req.files.find((f) => f.fieldname === 'fileshopact')?.filename || null,req.body.address,req.files.find((f) => f.fieldname === 'filelogo')?.filename || null,req.body.stateid, req.body.cityid,new Date(),new Date()], function(error, result) 
    {
        if(error)
        {
            console.log(error);
            return res.status(500).json({result:false, message:'Unable to save restaurant details.'});
        }
        else
        {
            res.status(200).json({result:true, message:'Restaurant Added Successfully'});
        }
    }
    )
});

module.exports = router;
