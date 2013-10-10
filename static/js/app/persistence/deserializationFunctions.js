define( [
          'game/Game',
          'persistence/spriteDeserializationFunctions',
          'screen/singleFrameScreen/SingleFrameScreen' ],
          function(
              Game,
              spriteFunctions,
              SingleFrameScreen ) {

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

    gameOptions[ 'sprites' ] = Array();

    if ( json.sprites ) {
      json.sprites.forEach( function( curSpriteJson ) {
        gameOptions[ 'sprites' ].push( spriteFunctions.makeSprite( curSpriteJson ) );
      } );
    }
    return new Game( json.id, gameOptions );

  };

  var deserializationFunctions = {
      makeGame : makeGame
  };

  return deserializationFunctions;

} );
