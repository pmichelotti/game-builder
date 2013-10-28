var pngExporter = require( './export/sprite/exporter/SpritePNGExporter' ).exporter;
var persistenceManager = require( './persistence/json/fileBased/jsonFilePersistence' );

persistenceManager.get( __dirname + '/test-game-directory/games/sadfasdfasdf', function( success, data ) {
  if ( success ) {
    
    if ( data.sprites && data.sprites.length ) {
      pngExporter( data.sprites[ 1 ], __dirname + '/test-output-directory/test.png' );  
    }
    
  }
  else {
    console.log( 'Error hit deserializing game ' + data );
  }
} );