var axios = require('axios');
const db = require("../models");
const parking = db.parking;

exports.getAllParkings = (req,res) =>{
    parking.findAll()
    .then(parks =>{
        parks[0].duree=0;
        var config;
        var promises = [];
        var parkings = [];
        console.log("------------------------------");
        console.log(req.body);
        // console.log(`Your port is ${process.env.ACCESS_TOKEN}`);
        console.log("------------------------------");
        Promise.all(
        parks.map(async park => {
        
            console.log("inside");
            // console.log(k + ' - ' + parks[k].id);
            config = {
                method: 'get',
                url: 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/'+park.Longitude+','+park.Latitude+';'+req.body.lon+','+req.body.lat+';'+req.body.lon+','+req.body.lat+'?'
                            + 'access_token='+process.env.ACCESS_TOKEN,
                headers: { }
            };
            promises.push(axios(config)
            .then(function (response) {
                console.log("------");
                console.log(response.data);
                var d = {};
                d.id=park.id;
                d.nom=park.nom;
                d.longitude=park.Longitude;
                d.latitude=park.Latitude;
                d.taille=park.taille;
                d.placeOcc=park.placeOcc;
                d.image=park.image;
                d.prix=park.prix;
                d.commune = park.commune;
                d.tempsOuv = park.tempsOuv;
                d.tempsFerm = park.tempsFerm;
                d.duree = response.data.durations[0][2];
                d.distance = response.data.destinations[2].distance;
                parkings.push(d);
                console.log("------");
            })
            .catch(function (error) {
            console.log(error);
            }));
            return Promise.all(promises)
        })
        ).then(r=>{
            
            console.log("///////////////////before///////////////////////////////");
            console.log(parkings);
            return res.status(200).send(parkings);
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}

// exports.getAllParkings = (req,res) =>{
//     parking.findAll()
//     .then(parks =>{
//         console.log(parks);
//         return res.status(200).send(parks);
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message })
//     });
// }


// exports.getAllParkings = (req,res) =>{
//     parking.findAll()
//     .then(parks =>{
//         return res.status(200).send(parks);
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message })
//     });
// }

exports.getParkingById = (req,res) =>{
    parking.findOne({
        where:{
            id:req.body.id
        }
    })
    .then(park =>{
        return res.status(200).send({park});
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}