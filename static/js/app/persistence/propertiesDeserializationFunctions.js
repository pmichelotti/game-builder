define( [ 'properties/Properties', 'arrays/ArrayDecorator' ], function( Properties, ArrayDecorator ) {
  
  var makeProperties = function( json, options ) {
    
    json = json || {};
    
    var propertiesOptions = {};
    
    propertiesOptions[ 'ticksPerSecond' ] = json.ticksPerSecond;
    
    if ( json.renderingClock && options.gameClocks ) {
      
      var renderingClock = new ArrayDecorator( options.gameClocks ).filterById( json.renderingClock );
      
      if ( renderingClock ) {
        propertiesOptions[ 'renderingClock' ] = renderingClock;
      }
      
    }
    
    return new Properties( propertiesOptions );
    
  };
  
  return {
    makeProperties : makeProperties
  };
  
} );