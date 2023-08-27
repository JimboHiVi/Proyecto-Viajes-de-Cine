const connection = require('../config/database')

class PlaceController{

  onePlace = (req, res) =>{
    let place_id = req.params.place_id;

    let sql =`SELECT s.*, p.* from place p 
    left join sequence s on p.place_id = s.place_id and s.sequence_deleted = 0
    WHERE p.place_deleted = 0 AND p.place_id = ${place_id}`
    
    connection.query(sql, (err, result) => {
        if(err) throw err;
        let finalResult = {};
        let sequences = [];
        let sequence = {};

        result.forEach(elem => {
            if(elem.sequence_id != null){
                sequence = {
                  sequence_id: elem.sequence_id,
                  movie: elem.movie,
                  movie_year: elem.movie_year,
                  synopsis: elem.synopsis,
                  sequence_img: elem.sequence_img
                }
                sequences.push(sequence)
            }
        })

        finalResult = {
          place_id: place_id,
          name: result[0].name,
          address: result[0].address,
          place_img: result[0].place_img,
          history: result[0].history,
          sequences
        }
          //console.log(finalResult);

        res.render('onePlace', { finalResult })
      }
    )
  }

  allPlaces = (req, res) => {

    let sql = "SELECT * FROM place WHERE place_deleted = 0";
  
    connection.query(sql, (err, result) => { 
        if(err) throw err;    
        res.render('allPlaces', { result });
      }
    )  
  }

  createForm = (req, res) => { 
    let city_id = req.params.city_id;
    res.render('placeForm', {messageId: city_id});
  }

  createPlace = (req, res) => {   
    let city_id = req.params.city_id;
    const { name, address, history } = req.body;    
    let img = req.file?.filename;

    if (
      name === '' ||
      address === '' ||
      history === '' ||
      img === undefined
    )
    {
      return res.render('placeForm', {message: 'Todos los campos son obligatorios.', messageId: city_id})
    }

    let sql = `INSERT INTO place (name, address, history, place_img, destination_id) VALUES ('${name}','${address}','${history}', '${img}', ${city_id})`

    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect(`/city/oneCity/${city_id}`)
      }
    )    
  }

  editPlaceForm = (req, res)=>{
    let {place_id} = req.params;
    let sql = `select * from place where place_id = ${place_id}`
    
    connection.query(sql, (err, result) => {
      if(err) throw err;      
      res.render('placeEdit', {result});
    })
  }

  editPlace = (req, res) => {
    let {place_id} = req.params;
    let {name, address, history} = req.body;

/*     if (
      name === '' ||
      address === '' ||
      history === ''    
    )
    {
      return res.redirect('editForm', {message: 'Todos los campos son obligatorios.', messageId: place_id})
    } */
  
    let sql = `UPDATE place SET name = '${name}', address = '${address}', history = '${history}' WHERE place_id = ${place_id}`
      
    connection.query(sql, (err, result) => {
      if(err) throw err;    
      res.redirect(`/place/onePlace/${place_id}`)
    }) 
    
  }
  
  logicDeletePlace = (req, res) => {
    let place_id = req.params.place_id;

    let sql = `UPDATE place p LEFT JOIN sequence s ON p.place_id = s.place_id SET p.place_deleted = 1, s.sequence_deleted = 1 WHERE p.place_id = ${place_id}`

    /*Para un borrado total en lugar de logico se usaria la siguiente sentencia:
    `DELETE FROM place where WHERE p.place_id = ${place_id}`
    las secuencias asociadas se borrarian solas al estar configurada la base de datos con borrado en "cascada" */

    connection.query(sql, (err, result) => {
        if (err) throw err;

        res.redirect('/')
      }
    )
  }
}



module.exports = new PlaceController