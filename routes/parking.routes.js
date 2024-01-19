const controller = require("../controllers/parking.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});
app.post("/parkings/getAllParkings", controller.getAllParkings);
app.get("/parkings/getParkingById", controller.getParkingById);
}