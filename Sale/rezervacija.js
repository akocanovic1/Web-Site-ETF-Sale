const Sequelize= require('sequelize');
const sequelize= require('./db.js');

module.exports = function (sequelize, DataTypes) {
    const Rezervacija = sequelize.define('Rezervacija', {
       
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                is: {
                    args: [[0-9]],
                    msg: "Nije pravilan format broja ida"
                }
            }
        },
        termin: {
            type: Sequelize.INTEGER,
        },
        sala: {
            type: Sequelize.INTEGER,
        },
        osoba: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
   },
   {timestamps: false,
    freezeTableName: true,}
   );

   Rezervacija.findAll({
       where:{
        termin: 1, 
        sala: 1, 
        osoba:1,
       }
   }).then(data =>{
       if(data[0]==undefined){
        Rezervacija.create({
            termin: 1, 
            sala: 1, 
            osoba:1,
        })
       }
   })
   Rezervacija.findAll({
    where:{
     termin: 2, 
     sala: 1, 
     osoba:3,
    }
}).then(data =>{
    if(data[0]==undefined){
        Rezervacija.create({
            termin: 2, 
            sala: 1, 
            osoba:3,
        })
    }
})

   return Rezervacija;
}

