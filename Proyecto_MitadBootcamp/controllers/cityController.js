const connection = require('../config/database')
const bcrypt = require('bcrypt');

class CityController{

  oneCity = (req, res) =>{
    let city_id = req.params.city_id;

    let sql =`SELECT d.*, p.* from destination d 
    left join place p on d.destination_id = p.destination_id and p.place_deleted = 0
    WHERE d.destination_deleted = 0 AND d.destination_id = ${city_id}`
    
    connection.query(sql, (err, result) => {
        if(err) throw err;
        let finalResult = {};
        let places = [];
        let place = {};

        result.forEach(elem => {
            if(elem.place_id != null){
                place = {
                  place_id: elem.place_id,
                  name: elem.name,
                  address: elem.address,
                  history: elem.history,
                  place_img: elem.place_img
                }
                places.push(place)
            }
        })

        finalResult = {
          destination_id: city_id,
          city: result[0].city,
          country: result[0].country,
          info: result[0].info,
          city_img: result[0].city_img,
          email: result[0].email,
          places
        }
        //console.log(finalResult);
        res.render('oneCity', { finalResult })
      }
    )
  }

  allCities = (req, res) => {

    let sql = "SELECT * FROM destination WHERE destination_deleted = 0";
  
    connection.query(sql, (err, result) => { 
        if(err) throw err;    
        res.render('allCities', { result });
      }
    )  
  }

  createForm = (req, res) => {    
    res.render('cityForm');
  }

  createCity = (req, res) => {   
    const { city, country, info, email, password } = req.body;    
    let img = req.file?.filename;
    const salt = 10;    

    if (
      city === "" ||
      country === "" ||
      info === "" ||
      email === "" ||
      password === "" ||
      password.length > 8 ||
      img === undefined
    )
    {
      return res.render('cityForm', {message: 'Todos los campos son obligatorios'})
    }

    bcrypt.hash(password, salt, (err, hash) => {
        if(err) throw err;
      
        let sql = `INSERT INTO destination (city, country, info, city_img, email, password) VALUES ('${city}','${country}','${info}', '${img}', '${email}', '${hash}')`
      
        connection.query(sql, (err, result) => {      
            if(err){
              if(err.code == 'ER_DUP_ENTRY'){
                res.render('cityForm', {message: 'Ya existe un destino con ese correo electronico.'});
              }else{
                res.render('cityForm', {message: 'Algo ha ido mal, intentelo de nuevo.'});
              }
            }
            res.redirect(`/city/oneCity/${result.insertId}`);
          }
        ) 
      }
    )   
  }
  
  logicDeleteCity = (req, res) => {
    let city_id = req.params.city_id;

    let sql = `UPDATE destination d LEFT JOIN place p ON d.destination_id = p.destination_id LEFT JOIN sequence s ON p.place_id = s.place_id SET d.destination_deleted = 1, p.place_deleted = 1, s.sequence_deleted = 1 WHERE d.destination_id = ${city_id}`

    connection.query(sql, (err, result) => {
        if (err) throw err;

        res.redirect('/city/allCities')
      }
    )
  }  
}

module.exports = new CityController