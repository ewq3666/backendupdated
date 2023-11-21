const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const Razorpay = require("razorpay");
require("dotenv").config({ path: "./.env" });
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(helmet());
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with your allowed domain
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/quetionsRoute"));
app.use("/api", require("./controllers/payment"));
app.use("/api", require("./controllers/razorpay"));
app.use("/api", require("./controllers/quize"));


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: err.message || "Something Went Wrong",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Resouce Not Found 404",
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("DataBase Connected");
  app.listen(process.env.PORT, console.log(`http://localhost:${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log("Unable To Connect Database" + err);
});
