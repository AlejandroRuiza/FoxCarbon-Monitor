var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var request = require('request');
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
var cheerio = require('cheerio')

var PORT = process.env.PORT || 3000;


app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/', express.static('/'));

app.use('/scripts', express.static('scripts'));

app.get('/index.html', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/graphics.html', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'graphics.html'));
});

app.get('/calculator.html', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'calculator.html'));
});

app.get('/about.html', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});


function getGraphic() {
    var date1 = "today-5DT00:00:00Z--todayT00:00:00Z:PT8H";
    var paramater = "co:ugm3";
    var center = "47.4245,9.3767"
    var url = 'https://biocom_ruiz:AGo972eOsWEdh@api.meteomatics.com/' + date1 + '/' + paramater + '/' + center + '/html';

    app.get('/about', function(req, res) {
        nightmare.goto(url).wait('body').evaluate(() => document.querySelector('body').innerHTML).end().then(response => {
            // console.log(getData(response));
            res.send(getData(response));
        }).catch(err => {
            // console.log(err);
            res.send("..");
        })
        let getData = html => {
            const $ = cheerio.load(html);
            return ($('#container').html());
        }
    });
    console.log("Hola");
}




app.listen(PORT, function() {
    console.log('Corriendo servicio en puerto:', PORT);
});