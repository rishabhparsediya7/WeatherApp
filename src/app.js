const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const templatePath = path.join(__dirname, "../views");
const staticPath = path.join(__dirname, "../public");
const apiKey = 'ba9a59e7dd87d6c1a3c4c9e9b2173786';
const axios = require('axios');
const navigator = require('navigator');
const getIP = require('ipware')().get_ip;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);


app.get("/", async(req, res) => {
    try {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=gwalior&appid=${apiKey}`;
        const weather1 = await axios.get(url);
        var url = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${apiKey}`;
        const weather2 = await axios.get(url);
        let temp1 = weather1.data.main.temp - 273.5;
        temp1 = temp1.toFixed(2);
        let temp2 = weather2.data.main.temp - 273.5;
        temp2 = temp2.toFixed(2);
        const c1 = weather1.data.weather[0].main;
        const c2 = weather2.data.weather[0].main
        const weathercondition1 = weather1.data.weather[0].main;
        wc1 = "images/" + weathercondition1 + ".png";
        const weathercondition2 = weather2.data.weather[0].main;
        wc2 = "images/" + weathercondition2 + ".png";
        res.render("index", { weather1, weather2, temp1, temp2, c1, c2, wc1, wc2 });
    } catch (error) {
        if (error.response) {
            console.log(error);
        }
    }
})
app.post("/search", async(req, res) => {
    try {
        const city = req.body.search;
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const weather = await axios.get(url);
        const cityname = weather.data.name + ", " + weather.data.sys.country;
        const visibility = weather.data.visibility;
        const weathercondition = weather.data.weather[0].main;
        wc = "images/" + weathercondition + ".png";
        const overcast = weather.data.weather[0].description;
        let temp = weather.data.main.temp - 273.5;
        temp = temp.toFixed(2);
        const pressure = weather.data.main.pressure;
        const humidity = weather.data.main.humidity;
        const wind = weather.data.wind.speed;
        res.render("weather", { cityname, weathercondition, wc, overcast, temp, pressure, humidity, wind, visibility });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})

app.post('/getlocation', async(req, res) => {
    console.log();
    res.render("index");
});
app.get('*', function(req, res) {
    res.render('error');
});
app.listen(port, (req, res) => {
    console.log(`app is listening at ${port}`);
})