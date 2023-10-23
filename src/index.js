require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`server is running in port:${port}`);
});
