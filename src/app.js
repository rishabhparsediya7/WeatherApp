const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const templatePath = path.join(__dirname, "../views");
const staticPath = path.join(__dirname, "../public");
const axios = require('axios');
require('browser-env')(['navigator']);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", async(req, res) => {
        res.render("index");
})
app.get("/team", async(req, res) => {
    res.render("team");
})
app.get("about", async(req, res) => {
    res.render("about");
})
app.get("/events", async(req, res) => {
    res.render("events");
})
app.get("/register", async(req, res) => {
    res.render("register");
})
app.get("/superhero", async(req, res) => {
        res.render("superhero");
})
app.get("/about", async(req, res) => {
    res.render("aboutus");
})
app.get('*', function(req, res) {
    res.render('error');
});
app.listen(port, (req, res) => {
    console.log(`app is listening at ${port}`);
})