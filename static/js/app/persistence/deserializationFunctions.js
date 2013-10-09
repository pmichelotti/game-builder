define( [ 'game/Game', 'screen/singleFrameScreen/SingleFrameScreen' ], function( Game, SingleFrameScreen ) {

  var deserializationFunctions = {
    makeGame : function( json ) {

      var gameOptions = {};

      gameOptions[ 'name' ] = json.name;

      if ( json.screens ) {
        gameOptions[ 'screens' ] = Array();

        json.screens.forEach( function( curScreenJson ) {
          gameOptions[ 'screens' ].push( deserializationFunctions.makeScreen( curScreenJson ) );
        } );
      }

      return new Game( json.id, gameOptions );

    },
    makeScreen : function( json ) {
      //TODO : Need something to deserialize each screen type
      return new SingleFrameScreen( json.id, { name : json.name } );

    }
  };

  return deserializationFunctions;

} );
