/**
 * Created by Zuhaib Kathwari on 12-10-2016.
 */
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var siofu = require("socketio-file-upload");


//MIDDLEWARES

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(siofu.router).listen(8000);
app.use(bodyParser.json());

//GET REST API

app.get('/contacts', function(req, res) {
  console.log('recieved GET request');
    db.contactlist.find(function(err, docs) {
       console.log('db data: ', docs);
        res.json(docs)
    });
});

//POST API

app.post('/contacts', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, docs){
        res.json(docs);
    });
});

//DELETE API

app.delete('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log('Delete ID: ', id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs) {
        res.json(docs);
    });
});

//EDIT API
app.get('/contacts/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
    console.log('EDIT ID: ', id);
});

//UPDATE,Modify API
app.put('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc) {
                res.json(doc);
        });
});

server.listen(3000, function(){
    io.on('connection', function(socket){
        var uploader = new siofu();
        console.log('A user connected');

        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });

        uploader.on("saved", function(event){
            socket.emit('fileUploadSuccess', event.file);
        });

        uploader.dir = "uploads/files/images";
        uploader.listen(socket);
    });
    console.log('listening on *:3000');
});
