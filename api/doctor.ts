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
  },
});

//model
let Name = mongoose.model('Name', {
  Doctorname:{
    firstName:String,
    lastName:String,
    location:String,
  },
});


//model
let Insurance = mongoose.model('Insurance', {
  Insurance:{
    Insurance:String,
    location:String,
  },
});



//Better Doctor api
router.post('/doctor', function(req, res) {
  let newDoctor = new Doctor ({
      speciality:req.body.speciality,
      location:req.body.location,
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

  //Name Search Better Doctor api
  router.post('/doctor/name', function(req, res) {
    let newName = new Name ({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        location:req.body.location,
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

    //Name Search Better Doctor api
    router.post('/doctor/insurance', function(req, res) {
      let newInsurance = new Insurance ({
          insurance:req.body.insurance,
          location:req.body.location,
      })
      request('https://api.betterdoctor.com/2016-03-01/doctors?insurance_uid='+req.body.insurance+'&location='+req.body.location+'&user_key=ae582c881648eefe53789f1605e1f2c2',
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
