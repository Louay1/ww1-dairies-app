const {connection,selectDatabase} = require('./DB.js');


// fetch all rows
var allDairies = function(res){
    selectDatabase()
    sql='Select * from dairies'
    rows = null
    connection.query(sql,function(err, results){
        if(err) throw err
        res.render('pages/all', {dairies: results})
    })
}


// fetch row by id
var dairyById = function(res, id){
    selectDatabase()
    sql = `Select * from dairies where id Like '${id}'`
    connection.query(sql, function(err, results){
        if(err) throw err
        res.render('pages/dairy', {dairy: results[0]})
    })
}

// delete by id
var deleteById = (res,id) =>{
    selectDatabase()
    sql = `Delete From dairies where id like '${id}'`
    connection.query(sql, (err, results)=>{
        if(err) throw err
        console.log(id);
        allDairies(res)
    })
}

module.exports = {allDairies,dairyById, deleteById}