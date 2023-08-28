const connection = require('../config/database');

class SequenceController{

  allSequences = (req, res) => {
    let sql = "SELECT * FROM sequence WHERE sequence_deleted = 0";

    connection.query(sql, (err, result) => { 
        if(err) throw err;    
        res.render('allSequences', { result });
      }
    )
  }

  createForm = (req, res) => { 
    let place_id = req.params.place_id;
    res.render('sequenceForm', {messageId: place_id});
  }

  createSequence = (req, res) => {   
    let place_id = req.params.place_id;
    const { movie, year, synopsis } = req.body;    
    let img = req.file?.filename;

    if (
      movie === '' ||
      year === '' ||
      synopsis === '' ||
      img === undefined
    )
    {
      return res.render('sequenceForm', {message: 'Todos los campos son obligatorios.', messageId: place_id})
    }

    let sql = `INSERT INTO sequence (movie, movie_year, synopsis, sequence_img, place_id) VALUES ('${movie}',${year},'${synopsis}', '${img}', ${place_id})`

    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect(`/place/onePlace/${place_id}`)
      }
    )    
  }

  logicDeleteSeq = (req, res) => {
    let { place_id,sequence_id } = req.params;

    let sql = `UPDATE sequence SET sequence_deleted = 1 WHERE sequence_id = ${sequence_id}`

    connection.query(sql, (err, result) => {
        if (err) throw err;

        res.redirect(`/place/onePlace/${place_id}`)
      }
    )
  }

}

module.exports = new SequenceController