var express=require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString= process.env.DATABASE_URL || 'postgres://localhost:5432/sql_lecture2';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

router.get('/people', function(req, res){
    var results=[];
    pg.connect(connectionString, function(err, client, done){
        var query = client.query("SELECT name FROM users ORDER BY name ASC");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if (err){
            console.log("Error in getting users ", err);
        }
    });
});

router.get('/addresses', function(req, res){
    var addresses=[];
    pg.connect(connectionString, function(err, client, done){
        var name = req.query;
        var query = client.query("SELECT users.name, addresses.* FROM users JOIN addresses ON users.id = addresses.user_id WHERE users.name=$1",
        [req.query.name]);

        query.on('row', function(row){
            addresses.push(row);
        });

        query.on('end', function(){
           client.end();
            return res.json(addresses);
        });

        if (err){
            console.log("Error getting addresses ", err);
        }

    });
});

router.get('/orders', function(req, res){
    var orders=[];
    pg.connect(connectionString, function(err, client, done){
    var query=client.query("SELECT users.name, addresses.*, orders.* " +
        "FROM orders " +
        "JOIN addresses " +
        "ON addresses.address_id=orders.ship_address_id " +
        "JOIN users " +
        "ON users.id=orders.user_id " +
        "WHERE users.name=$1 AND orders.order_date>$2 AND orders.order_date<$3",
    [req.query.name, req.query.startdate, req.query.enddate]);

        query.on('row', function(row){
            orders.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(orders);
        });

        if (err){
            console.log("Error getting addresses ", err);
        }

    });
});


router.get('/*', function(req, res, next){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;