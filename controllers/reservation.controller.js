const { CommandCompleteMessage } = require("pg-protocol/dist/messages");
const { Sequelize } = require("sequelize");
const { reservation } = require("../models");
const db = require("../models");
const QRCode = require('qrcode')
const Reservation = db.reservation;
const Parking = db.parking;
const User = db.user;


exports.reserver =(req,res)=>{
    User.findOne({
        where:{
            email:req.body.emailUser
        }
    })
    .then(utilisateur=>{
        console.log("----idpark:"+req.body.idPark)
        Parking.findOne({
            where:{
                id : req.body.idPark,
            }
        })
        .then(parc=>{
            console.log("id after :"+parc.id)
            if(parc.placeOcc<parc.taille){
                Parking.update({
                placeOcc : parc.placeOcc + 1 
                },
                {
                    where:{
                        id:parc.id
                    }
                })
                .then(park=>{
                    console.log("----------------------");
                    console.log(parc.id,utilisateur.id,req.body.tempsDebut,req.body.tempsFin);
                    var code;
                    var stringdata = JSON.stringify(27)
                    QRCode.toString(stringdata,{type:'terminal'},function (err, qrcode) {
                        if(err) return console.log("error occurred")
                        //console.log(qrcode);
                        code = qrcode;
                    });
                    Reservation.create({
                        idPark : parc.id,
                        idUser : utilisateur.id,
                        tempsDebut: req.body.tempsDebut,
                        tempsFin:req.body.tempsFin,
                        montant:req.body.montant
                    })
                    .then(reservation=>{
                        var reserv ={
                            "id" : reservation.id,
                            "emailUser": utilisateur.email,
                            "idPark":parc.id,
                            "tempsDebut": reservation.tempsDebut,
                            "tempsFin": reservation.tempsFin,
                            "qrcode":code,
                            "montant":req.body.montant
                        }
                        return res.status(200).send(reserv);
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message })
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
            }
            else{
                return res.status(400).json("On s'excuse, ce parking est rempli" ); 
            }
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}