const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require("./models");
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });
var corsOptions = {
  origin: "http://localhost:8083"
};
// const db = require("./models");
db.sequelize.sync();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ParkMe application." });
});
require('./routes/auth_insc.routes')(app);
require('./routes/parking.routes')(app);
require('./routes/reservation.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const QRCode = require('qrcode')
 
// Creating the data
let data = {
    age:27
}
 
// Converting the data into String format
let stringdata = JSON.stringify(27)
QRCode.toString(stringdata,{type:'terminal'},function (err, qrcode) {
  if(err) return console.log("error occurred")
  console.log(qrcode)
})
   
// Converting the data into base64
QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")
 
    // Printing the code
    //console.log(code)
})
