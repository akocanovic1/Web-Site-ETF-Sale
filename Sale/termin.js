
const Sequelize= require('sequelize');
const sequelize= require('./db.js');

module.exports = function (sequelize, DataTypes) {
    const Termin = sequelize.define('Termin', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                is: {
                    args: [[0-9]],
                    msg: "Nije pravilan format broja telefona"
                }
            }
        },
        redovni:{type:Sequelize.BOOLEAN},
        dan: {
            type: Sequelize.INTEGER,
        },
        datum:{type:Sequelize.STRING},
        semestar: {
            type: Sequelize.STRING,
           
        },
        pocetak:{type:Sequelize.TIME},
        kraj:{type:Sequelize.TIME},
   }, {timestamps: false,
    freezeTableName: true,}
   );

   Termin.findAll({
       where:{
        redovni: false, 
        datum: '01.01.2020',
        pocetak: '12:00',
        kraj: '13:00'
       }
   }).then(data=>{
       if(data[0]==undefined){
        Termin.create({
            redovni: false, 
            datum: '01.01.2020',
            pocetak: '12:00',
            kraj: '13:00'
        })
       }
   })
   Termin.findAll({
       where:{
        redovni: true, 
        dan: 0, 
        semestar: 'zimski',
        pocetak: '13:00',
        kraj: '14:00'
       }
   }).then(data=>{
       if(data[0]==undefined){
        Termin.create({
            redovni: true, 
            dan: 0, 
            semestar: 'zimski',
            pocetak: '13:00',
            kraj: '14:00'
        })
       }
   })

   return Termin;
}
