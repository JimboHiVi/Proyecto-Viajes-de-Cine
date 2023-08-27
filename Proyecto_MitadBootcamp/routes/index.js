const express = require('express');
const router = express.Router();
const connection = require('../config/database')

//localhost:3000
router.get('/', (req, res) => {

  let sql = "SELECT * FROM destination WHERE destination_deleted = 0";

  connection.query(sql, (err, result) => { 
      if(err) throw err;    
      res.render('index', { result });
    }
  )  
});

module.exports = router;


