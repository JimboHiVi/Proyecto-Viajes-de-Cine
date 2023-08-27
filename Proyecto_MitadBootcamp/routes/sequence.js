const express = require('express');
const router = express.Router();
const connection = require('../config/database')

//localhost:3000/sequence
router.get('/', (req, res) => {
    let sql = "SELECT * FROM sequence WHERE sequence_deleted = 0";

    connection.query(sql, (err, result) => { 
        if(err) throw err;    
        res.render('allSequences', { result });
      }
    )
  }
)

module.exports = router;