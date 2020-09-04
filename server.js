const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.static(path.resolve(__dirname, "dist")));

const server = app.listen(process.env.PORT, () => {
  const { port, address } = server.address();

  console.log(`App listening at http://${address}:${port}`);
});
