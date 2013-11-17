var exportSprite = require( '../../sprite/exporter/SpritePNGExporter' ).exporter;
  
var exportFunction = function( game, exportPath, callback ) {
  
  var retGameObject = {};
  var exportedFiles = {};
  
  retGameObject[ 'id' ] = game.id;
  
  console.log( 'GameExporter.exportFunction : Exporting game ' + game.id );
  
  var exportTracker = new function( completedCallback ) {
    
    var exportTrackerSelf = this;
    
    this.completedCallback = completedCallback;
    
    this.screenExportCompleted = false;
    this.screenFlowExportCompleted = false;
    this.spriteExportCompleted = false;
    this.interactionsExportCompleted = false;
    this.gameClocksExportCompleted = false;
    this.propertiesExportComplete = false;
    
    this.screenExportDone = function() {
      console.log( 'GameExporter.exportFunction : Screen Export Done' );
      exportTrackerSelf.screenExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    this.screenFlowExportDone = function() {
      console.log( 'GameExporter.exportFunction : Screen Flow Export Done' );
      exportTrackerSelf.screenFlowExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    this.spriteExportDone = function() {
      console.log( 'GameExporter.exportFunction : Sprite Export Done' );
      exportTrackerSelf.spriteExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    this.interactionsExportDone = function() {
      console.log( 'GameExporter.exportFunction : Interactions Export Done' );
      exportTrackerSelf.interactionsExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    this.gameClocksExportDone = function() {
      console.log( 'GameExporter.exportFunction : Game Clocks Export Done' );
      exportTrackerSelf.gameClocksExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    this.propertiesExportDone = function() {
      console.log( 'GameExporter.exportFunction : Properties Export Done' );
      exportTrackerSelf.propertiesExportCompleted = true;
      exportTrackerSelf.checkCompleted();
    };
    
    
    this.checkCompleted = function() {
      if (
          exportTrackerSelf.screenExportCompleted && 
          exportTrackerSelf.screenFlowExportCompleted && 
          exportTrackerSelf.spriteExportCompleted && 
          exportTrackerSelf.interactionsExportCompleted && 
          exportTrackerSelf.gameClocksExportCompleted && 
          exportTrackerSelf.propertiesExportCompleted
      ) {
    
        console.log( 'GameExporter.exportFunction : Export Completed' );
        callback( retGameObject, exportedFiles );
      
      }
    };
    
  };
  
  exportScreens( game, exportPath, function( screenJson ) {
  
    retGameObject[ 'screens' ] = screenJson;
    exportTracker.screenExportDone();
    
  } );
  
  exportScreenFlow( game, exportPath, function( screenFlowJson ) {
    
    retGameObject[ 'screenFlowJson' ] = screenFlowJson;
    exportTracker.screenFlowExportDone();
    
  } );
  
  exportSprites( game, exportPath, function( spriteJson, spriteFiles ) {
    
    retGameObject[ 'sprites' ] = spriteJson;
    exportedFiles[ 'sprites' ] = spriteFiles;
    exportTracker.spriteExportDone();
    
  } );
  
  exportInteractions( game, exportPath, function( interactionsJson ) {
    
    retGameObject[ 'interactions' ] = interactionsJson;
    exportTracker.interactionsExportDone();
    
  } );
  
  exportGameClocks( game, exportPath, function( gameClocksJson ) {
    
    retGameObject[ 'gameClocks' ] = gameClocksJson;
    exportTracker.gameClocksExportDone();
    
  } );
  
  exportProperties( game, exportPath, function( propertiesJson ) {
  
    retGameObject[ 'properties' ] = propertiesJson;
    exportTracker.propertiesExportDone();
    
  } );
  
};

var exportScreens = function( game, exportPath, callback ) {
  
  callback( game.screens );
  
};

var exportScreenFlow = function( game, exportPath, callback ) {
  
  callback( game.screenFlow );
  
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
  
  console.log( 'GameExporter.exportSprites : ' + spritesToProcess + ' sprites to process' );
  
  var spriteFiles = Array();
  
  game.sprites.forEach( function( curSpriteJson ) {
    
    var fileName = exportPath + curSpriteJson.id + '.png';
    
    console.log( 'GameExporter.exportSprites : Processing sprite ' + curSpriteJson.id );
    
    spriteFiles.push( fileName );
    
    exportSprite( curSpriteJson, fileName, function( exportedSpriteJson, writtenFileName ) {
      
      retSprites[ curSpriteJson.id ] = exportedSpriteJson;
      spritesProcessed = spritesProcessed + 1;
      
      console.log( 'GameExporter.exportSprites : Completed processing sprite ' + curSpriteJson.id + ' : ' + spritesProcessed + ' sprites processed' );
      
      if ( spritesProcessed >= spritesToProcess ) {
        console.log( 'GameExporter.exportSprites : All sprites processed' );
        callback( retSprites, spriteFiles );
      }
      
    } );
    
  } );
  
};

/**
 * The interactions JSON represented in the game JSON should be acceptable as is
 */
var exportInteractions = function( game, exportPath, callback ) {
  
  callback( game.interactions );
  
};


var exportGameClocks = function( game, exportPath, callback ) {
  
  callback( game.gameClocks );
  
};

var exportProperties = function( game, exportPath, callback ) {
  
  callback( game.properties );
  
};

exports.exporter = exportFunction;
