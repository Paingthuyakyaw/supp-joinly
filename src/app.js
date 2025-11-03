const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./connect");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Thank you",
  });
});

// api routes
app.use("/api/auth", require("./router/auth.route"));

connectDB();
app.listen(3000, () => console.log("Listening 3K"));
