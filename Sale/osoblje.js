const Sequelize= require('sequelize');
const sequelize= require('./db.js');

module.exports = function (sequelize, DataTypes) {
    const Osoblje = sequelize.define('Osoblje', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                is: {
                    args: [[0-9]],
                    msg: "Nije pravilan format broja telefona"
                }
            }
        },
       ime: Sequelize.STRING,
       prezime: Sequelize.STRING,
       uloga: Sequelize.STRING,
   },
   {timestamps: false,
    freezeTableName: true,}
   );


   Osoblje.findAll({
       where:{
       ime: 'Neko', 
       prezime: 'Nekic', 
       uloga: 'profesor'
       }
   }).then(data=>{
       if(data[0]==undefined){
        Osoblje.create({
            ime: 'Neko', 
            prezime: 'Nekic', 
            uloga: 'profesor'
        })
       }
   })
   Osoblje.findAll({
    where:{
    ime: 'Drugi', 
    prezime: 'Treci', 
    uloga: 'asistent'
    }
    }).then(data=>{
    if(data[0]==undefined){
     Osoblje.create({
         ime: 'Drugi', 
         prezime: 'Treci', 
         uloga: 'asistent'
     })
    }
    })
    Osoblje.findAll({
    where:{
    ime: 'Test', 
    prezime: 'Test', 
    uloga: 'asistent'
    }
    }).then(data=>{
    if(data[0]==undefined){
     Osoblje.create({
         ime: 'Test', 
         prezime: 'Test', 
         uloga: 'asistent'
     })
    }
})
   return Osoblje;
}
