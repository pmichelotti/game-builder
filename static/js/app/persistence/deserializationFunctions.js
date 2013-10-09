define( [ 'game/Game' ], function( Game ) {

  var deserializationFunctions = {
    makeGame : function( json ) {

      return new Game( json.id, { name : json.name } );

    }
  };

  return deserializationFunctions;

} );
