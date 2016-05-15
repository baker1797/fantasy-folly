// MODULES.
var express    = require('express');
var path       = require('path');
//var handlebars = require('express-handlebars');
//var fs         = require('fs');
var mongodb    = require('mongodb');

// APP.
//var app = express();
var app = express();//module.exports = express();
var env = app.get('env');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use( '/scripts', express.static(__dirname + '/scripts') );

//if not local enable handlebars cache
if(env !== 'local' && env !== 'test'){
    app.enable('view cache');
}

// views is directory for all template files
//app.engine('html', hbs.engine);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
//app.set('view engine', 'html');

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname
//var uri = process.env.PROD_MONGODB;
var uri = "mongodb://infinity1797:7ul4f92nPQ@ds027335.mongolab.com:27335/fantasy_folly";


// TODO - Setup handlebars / react / angular template.


app.get( '/', function ( request, response ) {
    require( path.join(__dirname, 'smb-perfect/index') );
    response.render( 'pages/index' );
} );


//BQD_NZ8x75HZrlx2HAg6i9NPi1s21Cr9mtgKuSASc78TapbLK8p68JstuTgVU2oTgReBW57Tn1GjcXrrZC8l9N2aFwKio0








app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});












/**********************************************************************
 *********************************************************************/

/**
 * TODO - Sections middleware
 */
/*
 // ******* Add Sections *******

 // Add middleware


 require( sectionPath + "/controller" );
 app.use( mongoRoutes() );

 //utils.addSections(path.join(__dirname,"sections"));
 var sectionConfig = JSON.parse(fs.readFileSync(sectionConfigPath, "utf8"));
 for ( var section in sectionConfig ) {
 try {
 require( sectionPath + "/controller" );
 } catch (e) {

 }
 }
 */