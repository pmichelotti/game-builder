define( [ 'screen/singleFrameScreen/SingleFrameScreen', 'shapes/Size', 'arrays/ArrayDecorator' ], function( SingleFrameScreen, Size, ArrayDecorator ) {
  
  /**
   * It is expected that Sprites and Interactions have been built by this point and as such, 
   * options should be populated with Sprites and Interactions keys.  
   */
  var deserializer = function( json, options ) {
    
    var screenOptions = {};
    
    screenOptions[ 'name' ] = json.name;
    screenOptions[ 'type' ] = json.type;
    screenOptions[ 'duration' ] = json.duration;
    
    if ( json.size ) {
      screenOptions[ 'size' ] = new Size( json.size.width, json.size.height );
    }
    
    if ( json.sprite ) {
      var selectedSprite = new ArrayDecorator( options.sprites ).filterById( json.sprite );
      screenOptions[ 'sprite' ] = selectedSprite;
    }
    
    if ( json.frame && screenOptions[ 'sprite' ] ) {
      screenOptions[ 'frame' ] = new ArrayDecorator( screenOptions[ 'sprite' ].spriteFrames ).filterById( json.frame );
    }
    
    if ( json.bypassInteraction ) {
      screenOptions[ 'bypassInteraction' ] = new ArrayDecorator( options.interactions ).filterById( json.bypassInteraction );
    }
    
    return new SingleFrameScreen( json.id, screenOptions );
    
  };
  
  return deserializer;
  
} );