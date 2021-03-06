var express = require( 'express' );
var fs = require( 'fs' );
var app = express();

var persistenceManager = require( '../persistence/json/fileBased/jsonFilePersistence' );

var zipExporter = require( '../export/archive/zipFileExporter' );

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

  /*
   * GET JSON representation of an individual game
   */
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
  
  app.get( /^\/games\/\w(\w|-)*\.zip$/, function( req, res ) {
    
    console.log( 'Exporting game ' + gameDirectory + req.path );
    
    persistenceManager.get( gameDirectory + req.path.substring( 0, req.path.length - 4 ), function( success, data ) {
      
      if ( success ) {
        zipExporter.exportGame( data, function( success, zipFile ) {
          
          if ( success ) {
            res.set( 'Content-Type', 'application/zip' );
            console.log( 'Sending zipped game file ' + zipFile );
            res.sendfile( zipFile );
          }
          else {
            console.log( 'Error encountered exporting Game object' );
            res.send( 500 );
            return;
          }
          
        } );
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

  /*
   * GET JSON representation of all known games
   */
  app.get( '/games.json', function( req, res ) {

    console.log( 'Requesting games list' );

    fs.readdir( gameDirectory + '/games', function( error, files ) {
      if ( error ) {
        res.send( 500, error );
        return;
      }

      console.log( 'Found games ' + files );

      res.send( files );
    } );
  } );


  app.listen( 8000 );

  console.log( 'Game Builder Server Started - Listening at port 8000' );

};

exports.start = start;
