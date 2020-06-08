const express = require('express');
const router = express.Router()
const {connection, selectDatabase, insertDairy} = require('./config/DB.js')
const {allDairies,dairyById, deleteById} = require('./config/dairiesQueries.js')


const server = express();
server.use(express.urlencoded())

const PORT = process.env.PORT || 5500;

server.set('view engine', 'ejs');
server.use(express.static('views'));

server.get('/', function(req, res){
    res.render('pages/index')
})

server.get('/add', function(req, res){
    res.render('pages/add')
})

server.get('/delete', (req, res)=>{
    connection.connect(function(){
        console.log('Connected');
    });

    const id = req.body.id
    console.log(id);
    
    deleteById(res, id);
})


server.get('/all', function(req, res){
    connection.connect(function(){
        console.log('Connected');
    });
    allDairies(res);
})

server.get('/all/:id', function(req, res){
    connection.connect(function(){
        console.log('Connected');
    });
    const id = req.params.id;
    console.log(id);
    dairyById(res,id)
})

/*
data = []
server.post('/submit', (req, res)=>{
    const title = req.body.title
    const id = title.split(' ').join('_')
    const body = req.body.editor1

    const dairy = {
        "id_dairy": "\""+id+"\"",
        "title": `"${title}"`,
        "body": `"${body}"`
    }

    data.push(dairy);

    console.log(data);
    res.render('pages/index')
})
*/

server.post('/submit', (req, res)=>{
    connection.connect(function(){
        console.log('Connected');
    });

    const title = req.body.title
    const id = title.split(' ').join('_')
    const body = req.body.editor1
    const pic = req.body.pic
    console.log(pic)
    const picture = "../images/"+pic
    insertDairy({id, title, body, picture});

    

    res.redirect('/all')
})



server.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`);
})