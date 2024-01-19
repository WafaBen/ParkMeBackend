const db = require("../models");
const user = db.user;
const sequelize = require("sequelize")
//-----------------------------------
//Fonction de connexion
//-----------------------------------
exports.seconnecter = (req,res) =>{
    console.log("test  "+req.body.email);
    console.log("test  "+req.body.motPasse);
    return user.findOne({
        where : {
            // [sequelize.Op.or]: [{numTel: req.body.email}, {email: req.body.email}]
            email: req.body.email
        }
    }).then(user =>{
        if(!user){
            return res.status(200).json(-1);
        }
        else if(user.motPasse !== req.body.motPasse){
            return res.status(200).json(-1);
        }
        else{
            return res.status(200).json(user.id);
        }
     
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
};
//---------------------------------------
//Fonction d'inscription
//---------------------------------------
exports.sinscrire = (req,res) =>{
    user.findOne({
        where:{
            numTel : req.body.numTel
        }
    })
    .then(el=>{
        // if(el) return res.status(404).send({ message: "Il existe un compte avec ce numéro de téléphone" });
        if(el)  return res.status(200).json(1);
        else{
            if(req.body.email){
                user.findOne({
                    where:{
                        email : req.body.email
                    }
                }) 
                .then(elem=>{
                    // if(elem) return res.status(404).send({ message: "Il existe un compte avec cet email" });
                    if(elem) return res.status(200).json(1);
                    else{
                        user.create({
                            nom : req.body.nom,
                            prenom: req.body.prenom,
                            email: req.body.email,
                            motPasse: req.body.mdp,
                            numTel: req.body.numTel
                            
                        })
                        .then(e =>{
                            // return res.status(200).send({message :"Compte crée avec succès!"});
                            return res.status(200).json(user.id);
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message })
                        }) 
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                })
            }
            else{
                user.create({
                    nom : req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    motPasse: req.body.mdp,
                    numTel: req.body.numTel
                    
                })
                .then(user =>{
                    return res.status(200).json(user.id);
                })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });  
            }
             
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });  
}