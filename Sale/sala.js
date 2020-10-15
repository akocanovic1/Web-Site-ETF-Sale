const Sequelize= require('sequelize');
const sequelize= require('./db.js');

module.exports = function (sequelize, DataTypes) {
    const Sala = sequelize.define('Sala', {
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
       naziv: {type: Sequelize.STRING},
       zaduzenaOsoba: {
        type: Sequelize.INTEGER,
       
       /* validate: {
            is: {
                args: [[0-9]],
                msg: "Nije pravilan format broja telefona"
            }
        }*/
   },
},
   {timestamps: false,
    freezeTableName: true,}
   );
   Sala.findAll({
       where:{
        naziv: '1-11', 
        zaduzenaOsoba: 1, 
       }
   }).then(data=>{
       if(data[0]==undefined){
        Sala.create({
            naziv: '1-11', 
            zaduzenaOsoba: 1, 
            })
       }
   })
   Sala.findAll({
    where:{
     naziv: '1-15', 
     zaduzenaOsoba: 2, 
    }
}).then(data=>{
    if(data[0]==undefined){
     Sala.create({
         naziv: '1-15', 
         zaduzenaOsoba: 2, 
         })
    }
})

return Sala;
}
