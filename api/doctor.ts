// import modules
import express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let request = require('request');

//model
let Doctor = mongoose.model('Doctor', {
  Doctor:{
    speciality:String,
    location:String,
    firstName:String,
    lastName:String,
  },
});
//Better Doctor api
router.post('/doctor', function(req, res) {
  let newDoctor = new Doctor ({
      speciality:req.body.speciality,
      location:req.body.location,
      firstName:req.body.firstName,
      lastName:req.body.lastName

  })
  request('https://api.betterdoctor.com/2016-03-01/doctors?query='+req.body.speciality+'&location='+req.body.location+'&sort=distance-asc&skip=0&limit=10&user_key=ae582c881648eefe53789f1605e1f2c2',
      function (error, response, body) {
        console.log(body)
        if (!error && response.statusCode == 200)
         {
          res.send(response)
        } else {
          console.log(error)
          res.send({message:'search not found'})
        }
    }
  )
  });

  router.post('/doctor/name', function(req, res) {
    let newDoctor = new Doctor ({
        speciality:req.body.speciality,
        location:req.body.location
    })
    request('https://api.betterdoctor.com/2016-03-01/doctors?first_name='+req.body.firstName+'&last_name='+req.body.lastName+'&location='+req.body.location+'&user_key=ae582c881648eefe53789f1605e1f2c2',
        function (error, response, body) {
          console.log(body)
          if (!error && response.statusCode == 200)
           {
            res.send(response)
          } else {
            console.log(error)
            res.send({message:'search not found'})
          }
      }
    )
    });






export = router;
