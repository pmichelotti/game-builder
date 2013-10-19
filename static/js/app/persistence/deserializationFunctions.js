define( [
          'game/Game',
          'persistence/spriteDeserializationFunctions',
          'screen/singleFrameScreen/SingleFrameScreen', 
          'persistence/interactionDeserializationFunctions',
          'persistence/screenFlowDeserializationFunctions',
          'persistence/gameClockDeserializationFunctions' ],
          function(
              Game,
              spriteFunctions,
              SingleFrameScreen, 
              interactionFunctions, 
              screenFlowFunctions, 
              gameClockFunctions ) {

  var makeScreen = function( json ) {
      //TODO : Need something to deserialize each screen type
      return new SingleFrameScreen( json.id, { name : json.name } );

  };



  var makeGame = function( json ) {

    var gameOptions = {};

    gameOptions[ 'name' ] = json.name;

    gameOptions[ 'screens' ] = Array();

    if ( json.screens ) {
      json.screens.forEach( function( curScreenJson ) {
        gameOptions[ 'screens' ].push( makeScreen( curScreenJson ) );
      } );
    }
    
    if ( json.screenFlow ) {
      gameOptions[ 'screenFlow' ] = screenFlowFunctions.makeScreenFlow( json.screenFlow, gameOptions[ 'screens' ] );
    }

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
    
    gameOptions[ 'gameClocks' ] = Array();
    
    if ( json.gameClocks ) {
      json.gameClocks.forEach( function( curGameClockJson ) {
        gameOptions[ 'gameClocks' ].push( gameClockFunctions.makeGameClock( curGameClockJson ) );
      } );
    }
    
    gameOptions[ 'ticksPerSecond' ] = json.ticksPerSecond;
    
    return new Game( json.id, gameOptions );

  };

  var deserializationFunctions = {
      makeGame : makeGame
  };

  return deserializationFunctions;

} );
