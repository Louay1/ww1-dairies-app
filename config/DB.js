
const mysql = require('mysql')


const connection = mysql.createConnection({
    // The connection object
    host: 'localhost',
    user:'root',
    password:'mynewpassword',
    databse:'wicked_week1'
})

// Yeah xDDD IKR
var selectDatabase = function(){
    sql = 'use wicked_week1';

    connection.query(sql, function(err){
        if(err) throw err;
        console.log('Database Selected');
    })
}


var createDairiesTable = function(err){

    if(err) throw err;

    sql='use wicked_weekend1\n'
        +'Create Table dairies('
        +'id Varchar(150) Primary Key,'
        +'title Varchar(255),'
        +'body Text,'
        +'picture Varchar(255));'
    ;
        
    console.log(sql);

    connection.query(sql, function(err, results){
        if(err) throw err;
        console.log(results);
    })

}


var insertDairy = function({...args}){
    selectDatabase()
    sql = `Insert Into dairies(id, title, body, picture) values ('${args.id}','${args.title}','${args.body}','${args.picture}')`;
    connection.query(sql, function(err, results){
        if(err) throw err;
        console.log(results);
    })
}

module.exports = {connection,selectDatabase, insertDairy}