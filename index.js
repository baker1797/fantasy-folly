var express = require('express');
var app = express();

// Database
var mongodb = require('mongodb');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname
//var uri = process.env.PROD_MONGODB;
var uri = "mongodb://infinity1797:7ul4f92nPQ@ds027335.mongolab.com:27335/fantasy_folly";


//https://github.com/tmpvar/jsdom
//$ = cheerio.load(


/**
 * Add a player to the db.
 * @param {string} name Player name.
 * @param {string} id   Player id.
 */
app.get('/mongo/players/add', function( req, res ) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

        if ( req.query.id && req.query.name && req.query.apikey === 'hacker' ) {
            var newPlayer = {
                id : req.query.id,
                name : req.query.name
            };

            console.log(req.query.league)
            if ( req.query.league !== undefined ) {
                newPlayer['league'] = req.query.league;
            }

            var players = db.collection('players');

            players.insert( newPlayer, function(err, result) {
                if(err) throw err;

                res.send(req.query);
                /*
                players.find( {} ).toArray(function (err, docs) {
                    res.send( docs );
                });
                */
            });
        } else {
            res.send('Not Authorized');
        }
    });
});

/**
 * List players
 * @param {string} league League filter.
 */
app.get('/mongo/players(/:league)?', function( req, res ) {
    console.log('players - league')
    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

        var league = req.params.league;
        var players = db.collection('players');
        var mq = {};

        if ( league ) {
            mq['league'] = league;
        }

        players.deleteMany( {id: null}, function(err, docs) {
            console.log('-Deleted-');
        });

        players.find( mq ).toArray(function (err, docs) {
            res.render('pages/mongo-test', { results: docs });
        });
    });
});

/**
 * Remove bad data
 */
app.get('/mongo/clean', function( req, res ) {
    console.log('players - league')
    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

        var players = db.collection('players');

        players.deleteMany( {id: null}, function(err, docs) {
            console.log('-Cleaned null id\'s-');
            res.send('-Cleaned null id\'s-');
        });
    });
});


app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/leagues/:league', function(request, response) {
    console.log(request.params)
    //response.send(request.params)
    response.render('pages/league', {league: request.params.league });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


