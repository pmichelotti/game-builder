var exportSprite = require( '../../sprite/exporter/SpritePNGExporter' ).exporter;
  
var exportFunction = function( game, exportPath, callback ) {
  
  var retGameObject = {};
  
  retGameObject[ 'id' ] = game.id;
  
  var exportTracker = new function( completedCallback ) {
    
    var exportTrackerSelf = this;
    
    this.completedCallback = completedCallback;
    
    this.spriteExportCompleted = false;
    
    this.spriteExportDone = function() {
      exportTrackerSelf.spriteExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    }( wrapupExport );
    
    
    this.checkCompleted = function() {
      if (
          exportTrackerSelf.spriteExportCompleted
      ) {
        exportTrackerSelf.completedCallback( retGameObject );
      }
    };
    
  };
  
  exportSprites( game, exportPath, function( spriteJson ) {
    
    retGameObject[ 'sprites' ] = spriteJson;
    exportTracker.spriteExportDone();
    
  } );
  
};
  
/**
 * Iterate through all of the sprites in the game and export them using the included 
 * sprite exporter.
 * 
 */
var exportSprites = function( game, exportPath, callback ) {
  
  var retSprites = {};
  
  var spritesToProcess = game.sprites.length;
  var spritesProcessed = 0;
  
  game.sprites.forEach( function( curSpriteJson ) {
    
    var fileName = exportPath + curSpriteJson.id + '.png';
    
    exportSprite( curSpriteJson, fileName, function( exportedSpriteJson, writtenFileName ) {
      
      retSprites[ curSpriteJson.id ] = curSpriteJson;
      spritesProcessed = spritesProcessed + 1;
      
      if ( spritesProcessed >= spritesToProcess ) {
        callback( retSprites );
      }
      
    } );
    
  } );
  
};

exports.exporter = exportFunction;
