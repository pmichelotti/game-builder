var gameExporter = require( '../game/exporter/GameExporter' ).exporter;
var archiver = require( 'archiver' );
var os = require( 'os' );
var fs = require( 'fs' );

var exportGame = function( game, callback ) {
  
  var outputArchive = archiver( 'zip' );
  
  var tempOutputZip = fs.createWriteStream( os.tmpDir() + '/temp-game.zip' );
  
  outputArchive.pipe( tempOutputZip );
  
  console.log( 'ZipFileExporter.exportGame : Exporting game to ' + tempOutputZip );
  
  gameExporter( game, os.tmpDir(), function( gameObject, exportedFiles ) {
    
    console.log( 'ZipFileExporter.exportGame : Game export completed - adding files to archive' );
    
    console.log( 'ZipFileExporter.exportGame : Adding Game Object to archive ' + JSON.stringify( gameObject ) );
    
    outputArchive.append( JSON.stringify( gameObject ), { name : 'game.json' } );
    
    for( var fileKey in exportedFiles ) {
      
      exportedFiles[ fileKey ].forEach( function( curFilePath ) {
        
        var fileName = curFilePath.substr( curFilePath.lastIndexOf( '/' ) );

        console.log( 'ZipFileExporter.exportGame : File ' + fileKey + fileName + ' being added to archive' );
        
        outputArchive.append( fs.createReadStream( curFilePath ), { name : fileKey + fileName } );
        
      } );
      
    }

    console.log( 'ZipFileExporter.exportGame : Finalizing archive' );
    
    outputArchive.finalize( function( err, bytes ) { 

      console.log( 'ZipFileExporter.exportGame : Archive finalized' );
          
      if ( err ) {
        callback( false );
        return;
      }
      
      callback( true, os.tmpDir() + '/temp-game.zip' );
      
    } );
    
  } );
  
};

exports.exportGame = exportGame;
