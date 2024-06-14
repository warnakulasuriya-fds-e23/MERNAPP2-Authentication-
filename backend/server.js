require("dotenv").config();

const express = require("express");

const workoutRoutes = require("./routes/workoutRoute");

const mongoose = require("mongoose");
// the express app will be named app1
const app1 = express();

//middle ware (this runs then afterwards it will go to the next middleware or route because of the next() function)
//first middleware will capture the contents of the incoming request including the body of the request
app1.use(express.json());
app1.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app1.use("/api/workouts", workoutRoutes);

//following is for establishing connection with mongodb database and then what should be done afterward
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app1.listen(process.env.PORT, () => {
      console.log("Database Connection successful!, listening in on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

//routes
// app1.get("/", (req, res) => {
//     //req variable handles requests (give by the user to the server) res variable handles responses (given by the server to the user)
//     res.json({ mssg: "Welcome to the app" });
//   });
