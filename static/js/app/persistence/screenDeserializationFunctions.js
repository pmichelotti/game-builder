define( [ 'persistence/screen/screenDeserializerRegistry' ], function( screenDeserializerRegistry ) {
  
  var makeScreen = function( json, options ) {
    
    return screenDeserializerRegistry[ json.type ]( json, options );
    
  };
  
  return {
    makeScreen : makeScreen
  };
  
} );
