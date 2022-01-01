const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    formidable = require('formidable');

//const Product = require('./database_config');
const houses = require('./database');
const app = express(),
    folder = path.join(__dirname + 'files');

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.static('public'));
app.use(express.static('files'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/main', function (req, res) {
    res.render('main');
});
app.get('/home', function (req, res) {
    houses.houses.findAll().then(house => {
        res.render('home', { house: house } )
    })
});
app.get('/available', function (req, res) {
    
    houses.houses.findAll().then(house => {
        res.render('available', { house: house } )
    })
});
app.get('/addproduct', function (req, res) {
    res.render('addproduct');
});

app.get('/product/:housesid', function (req, res) {
    houses.houses.findOne({ where: { id: req.params.housesid}}).then(house => {
        res.render('product', { house: house } )
    })
});

app.get('/store', function (req, res) {
    houses.houses.findAll().then(house => {
        res.render('store', { house: house } )
    })
});
app.get('/availabilities', function (req, res) {
    houses.houses.findAll().then(house => {
        res.render('availabilities', { house: house } )
    })
});


app.post('/addproduct', function (req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/files/' + file.name;
    });
    form.parse(req, (err, fields, files) => {
        const imgAddress = []
        for (let index = 0; index < files.image.length; index++) {
            imgAddress[index] = files.image[index].name
        }   
        

        houses.houses.create({
            houseName: fields.name,
            housePrice: fields.price,
            houseLocation: fields.location,
            houseDetails: fields.details,
            houseAvailable: fields.quantity, 
            productImg1: imgAddress[0],
            productImg2: imgAddress[1],
            productImg3: imgAddress[2],
            productImg4: imgAddress[3],
            productImg5: imgAddress[4],
            productImg6: fields.video
        }).then(response => {
            res.redirect(301, '/home')
        }).catch(error => {
            console.log(error)
        });
    });
})

app.listen(app.get('port'));