
app.get('/db', function( req, res ) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM nba_players', function(err, result) {
            done();
            if ( err ) {
                console.log(err);
                res.send("Error " + err);
            } else {
                console.log(result);
                res.render('pages/db', { results: result.rows, result: result });
            }
        })
    })
});
app.get('/db-create', function( req, res ) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('CREATE table players("id" VARCHAR(40), "name" VARCHAR(40))', function(err, result) {
            done();
            if ( err ) {
                console.log(err);
                res.send("Error " + err);
            } else {
                //result.rows

                console.log(result);
                res.render('pages/db', { results: result });
                client.end();
            }
        })
    })
});


app.get('/insert/:league/:id/', function( req, res ) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('INSERT INTO nba_players (id,name) VALUES (1, "Steph Curry")', function(err, result) {
            done();
            if ( err ) {
                console.log(err);
                res.send("Error " + err);
            } else {
                //result.rows
                //res.render('pages/db', { results: [] });
                response.send(request.params)
                //response.send(request.params)
            }
        })
    })
});
