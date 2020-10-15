var express= require('express');
var bodyParser= require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./db.js');
var app= express();
const Osoblje = sequelize.import(__dirname+'/osoblje.js');
const Rezervacija=sequelize.import(__dirname+'/rezervacija.js');
const Termin=sequelize.import(__dirname+'/termin.js');
const Sala=sequelize.import(__dirname+'/sala.js');

Osoblje.sync();
Termin.sync();
Sala.sync();
Rezervacija.sync();

Osoblje.hasMany(Rezervacija, {foreignKey: 'osoba'});            //KLJUCEVI
Rezervacija.belongsTo(Termin,{foreignKey:'termin'});
Sala.hasMany(Rezervacija,{foreignKey:'sala'});
Sala.belongsTo(Osoblje, {foreignKey: 'zaduzenaOsoba'});

app.use(bodyParser.json());
app.use(express.static('Spirala3'));
app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));

var rezervacija=require('./js/Pozivi.js');

app.get("/rezervacija.html",function(req,res){
    res.sendFile(__dirname + "/rezervacija.html");
});
app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/pocetna.html");
});
app.get("/pocetna.html",function(req,res){
    res.sendFile(__dirname + "/pocetna.html");
});
app.get("/unos.html",function(req,res){
    res.sendFile(__dirname + "/unos.html");
});
app.get("/sale.html",function(req,res){
    res.sendFile(__dirname + "/sale.html");
});
app.get("/osoblje.html",function(req,res){
    res.sendFile(__dirname + "/osoblje.html");
});

//UCITAVA SVE PROFESORE U LISTU
app.get("/osoblje",function(req,res){
    Osoblje.findAll().then(data=>{
        res.send(data);
    })
});

//UPIS REZERVACIJE U BAZU I PROVJERA ZAUZECA
app.post("/upisiUbazu",function(req,res){
    var j;
    var jsonData=req.body;
   console.log(jsonData);
   console.log(jsonData.zauzeto);
    var postojeceRezervacija;
    var trazenaOsoba;
   
    if(jsonData.zauzeto==false){
        Sala.findAll().then(data=>{console.log(data);})
        Termin.findAll({
            where:{
                redovni: jsonData.redovni,
                dan: jsonData.dan,
                datum: jsonData.datum,
                semestar: jsonData.semestar,
                pocetak: jsonData.pocetak,
                kraj: jsonData.kraj
            }
        }).then(termin =>{
            postojeceRezervacija=termin[0];
            console.log(postojeceRezervacija.id);
            Rezervacija.findAll({
                where: {
                    termin: postojeceRezervacija.id
                }
            }).then(rezervacija=>{
                Sala.findAll({
                    where:{
                        id: rezervacija[0].sala
                    }
                }).then(sala=>{
                    Osoblje.findAll({
                        where:{
                            id:sala[0].zaduzenaOsoba
                        }
                    }).then(osoba=>{
                        console.log(osoba[0].ime);
                        res.send(osoba[0].ime + " "+ osoba[0].prezime +" od: "+termin[0].pocetak+ ", do: "+ termin[0].kraj);
                    })
                })
                
                
            });
        });
        
    }else{
        Termin.create({
        redovni: jsonData.redovni,
        dan: jsonData.dan,
        datum: jsonData.datum,
        semestar: jsonData.semestar,
        pocetak: jsonData.pocetak,
        kraj: jsonData.kraj    
    }).then(function (termin){
        Osoblje.findAll({
            where: {
                ime:jsonData.ime,
            prezime:jsonData.prezime,
            }
        }).then(osoba=>{
            Sala.findAll({
                where:{naziv:jsonData.sala,
                zaduzenaOsoba:osoba[0].id},
            }).then(sala=>{
                if(sala[0]==undefined){
                    Sala.create({
                        naziv:jsonData.sala,
                zaduzenaOsoba:osoba[0].id
                    })
                }else{
                console.log(sala[0]);
                Rezervacija.create({
                    termin:termin.id,
                    sala:sala[0].id,
                    osoba: osoba[0].id
                });
            }

            })
        })
        if(termin){
            res.send(true);
        }
        else{res.status(400).send('Error in insert new record');}
    }); 
    }
});

app.get("/ucitajIzBaze",function(req,res){
    var rezervacija;
    Termin.findAll().then(data=>{
        res.send(data);
    });
})

app.get("/ucitajOsoblje",function(req, res){
    var osobe;
    Osoblje.findAll().then(osoblje=>{
        Sala.findAll({
        }).then(sale=>{
            Termin.findAll().then(termini=>{
                Rezervacija.findAll().then(rezervacije=>{
                    res.send([osoblje,sale,termini,rezervacije]);
                })
            })       
        })
    })
})

app.post("/filtrirajPodatke",function(req,res){
    var filterNazad;
    var jsonData=req.body;
    //console.log(jsonData);

    Osoblje.findAll({
        where:{
            ime:jsonData.profesorIme,
            prezime:jsonData.profesorPrezime
        }
    }).then(osoblje=>{
        Sala.findAll({
            where:{
                naziv:jsonData.sala,
                zaduzenaOsoba:osoblje[0].id,
            },
            //order: [ [ 'id', 'DESC' ]]
        }).then(sale=>{
            if(sale[0]==undefined){
                filterNazad={postoji:false,dan:null,datum:null}
                res.send(filterNazad);
            }else{
               // console.log(sale)
                Termin.findAll({
                    where:{
                        pocetak:jsonData.pocetak,
                        kraj:jsonData.kraj,
                        //id:rezervacije[0].termin,
                        redovni:jsonData.periodicnost
                    },
                    order: [ [ 'id', 'DESC' ]]
                }).then(termini=>{
                    if(termini[0]==undefined){
                    filterNazad={postoji:false,dan:null,datum:null}
                    res.send(filterNazad);
                }else{
                   // console.log(termini)
                    Rezervacija.findAll({
                        where:{
                            sala:sale[0].id,
                            termin:termini[0].id,
                            osoba:osoblje[0].id
                        },
                        order: [ [ 'id', 'DESC' ]]
                    }).then(rezervacija =>{
                        //console.log(rezervacija)
                        if(rezervacija[0]==undefined){
                            filterNazad={postoji:false,dan:null,datum:null}
                            res.send(filterNazad);
                        }else{
                            filterNazad={postoji:true,dan:termini[0].dan,datum:termini[0].datum} //VRATITI CIJELU TABELU
                           // console.log(filterNazad);
                            res.send(termini);
                        }
                    })
                }
                })
            }
        })
    })
})
app.listen(8080);