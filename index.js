require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const desHelper = require("./helpers/des.helpper");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Thuật toán mã hóa Des" });
});
app.post("/", (req, res) => {
    let M = req.body.M.replace(/\s/g, "").toUpperCase();
    let K = req.body.K.replace(/\s/g, "").toUpperCase();
    function isHexWithoutSpaces(str) {
        return /^[0-9A-Fa-f]+$/.test(str.replace(/\s/g, ""));
    }
    let output = {};
    output.M_data = req.body.M;
    output.K_data = req.body.K;
    if (isHexWithoutSpaces(M) && isHexWithoutSpaces(K)) {
        output = desHelper(M, K);
    } else output.error = true;
    res.render("index", { title: "Thuật toán mã hóa Des", output });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
