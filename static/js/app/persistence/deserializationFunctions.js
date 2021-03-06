define( [
          'game/Game',
          'persistence/spriteDeserializationFunctions',
          'persistence/screenDeserializationFunctions', 
          'persistence/interactionDeserializationFunctions',
          'persistence/screenFlowDeserializationFunctions',
          'persistence/gameClockDeserializationFunctions',
          'persistence/propertiesDeserializationFunctions' ],
          function(
              Game,
              spriteFunctions,
              screenFunctions, 
              interactionFunctions, 
              screenFlowFunctions, 
              gameClockFunctions,
              propertiesFunctions ) {


  var makeGame = function( json ) {

    var gameOptions = {};

    gameOptions[ 'name' ] = json.name;

    gameOptions[ 'sprites' ] = Array();

    if ( json.sprites ) {
      json.sprites.forEach( function( curSpriteJson ) {
        gameOptions[ 'sprites' ].push( spriteFunctions.makeSprite( curSpriteJson ) );
      } );
    }

    gameOptions[ 'interactions' ] = Array();
    
    if ( json.interactions ) {
      json.interactions.forEach( function( curInteractionJson ) {
        gameOptions[ 'interactions' ].push( interactionFunctions.makeInteraction( curInteractionJson ) );
      } );
    }

    gameOptions[ 'screens' ] = Array();
    
    if ( json.screens ) {
      json.screens.forEach( function( curScreenJson ) {
        gameOptions[ 'screens' ].push( screenFunctions.makeScreen( curScreenJson, gameOptions ) );
      } );
    }
    
    if ( json.screenFlow ) {
      gameOptions[ 'screenFlow' ] = screenFlowFunctions.makeScreenFlow( json.screenFlow, gameOptions[ 'screens' ] );
    }
    
    gameOptions[ 'gameClocks' ] = Array();
    
    if ( json.gameClocks ) {
      json.gameClocks.forEach( function( curGameClockJson ) {
        gameOptions[ 'gameClocks' ].push( gameClockFunctions.makeGameClock( curGameClockJson ) );
      } );
    }
    
    gameOptions[ 'properties' ] = propertiesFunctions.makeProperties( json.properties, gameOptions );
    
    return new Game( json.id, gameOptions );

  };

  var deserializationFunctions = {
      makeGame : makeGame
  };

  return deserializationFunctions;

} );
