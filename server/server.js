const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const api = require("./routes/api");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const ip = "localhost";

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

// All your handlers here...
app.use("/api", api);
app.listen(port, ip, () =>
  console.log(`App listening at http://localhost:${port}`)
);

app.listen(port, ip, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
