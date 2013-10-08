var express = require( 'express' );
var app = express();

var persistenceManager = require( '../persistence/json/fileBased/jsonFilePersistence' );

var start = function( staticDirectory, viewsDirectory, gameDirectory ) {

  /*
   * Setup the JADE Engine
   */
  app.engine( 'jade', require( 'jade' ).__express );
  app.set( 'views', viewsDirectory );

  /*
   * Setup Static Handling
   */
  app.use( express.static( staticDirectory ) );

  /*
   * Setup body parser
   */
  app.use( express.bodyParser() );

  /*
   * Setup the index rendering
   */
  app.get( '/', function( req, res ) {
    res.render( 'index.jade' );
  } );

  /*
   * Setup game persistence handling
   */
  app.put( /^\/games\/\w(\w|-)*$/, function( req, res ) {

    console.log( 'Saving game to ' + gameDirectory + req.path );
    console.log( req.body );

    persistenceManager.put( req.body, gameDirectory + req.path, function( success, msg ) {
      if ( success ) {
        res.send( 200 );
      }
      else {
        console.log( 'Error hit persisting game ' + msg );
        if ( typeof msg === 'number' ) {
          res.send( msg );
          return;
        }
        res.send( 500, msg );
        return;
      }
    } );

  } );

  app.get( /^\/games\/\w(\w|-)*\.json$/, function( req, res ) {

    console.log( 'Requesting game ' + gameDirectory + req.path );

    persistenceManager.get( gameDirectory + req.path.substring( 0, req.path.length - 5 ), function( success, data ) {
      if ( success ) {
        res.send( 200, data );
      }
      else {
        console.log( 'Error hit deserializing game ' + data );
        if ( typeof data === 'number' ) {
          res.send( data );
          return;
        }
        res.send( 500, data );
        return;
      }
    } );

  } );


  app.listen( 8000 );

  console.log( 'Game Builder Server Started - Listening at port 8000' );

};

exports.start = start;
