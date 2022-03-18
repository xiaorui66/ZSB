const config = {
  port: 3000,
  get url() {
    return `http://127.0.0.1:${this.port}`;
  },
};

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public/", express.static(path.join(__dirname, "/public/")));
app.engine("html", require("express-art-template"));

app.use((req, res, next) => {
  req.config = config;
  next();
});
app.use(router);

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

app.listen(config.port, () => console.log(`http://127.0.0.1:${config.port}`));
