define( [
         'screen/singleFrameScreen/SingleFrameScreen', 
         'persistence/screen/singleFrameScreenDeserializer'
         ], function(
         SingleFrameScreen, 
         singleFrameScreenDeserializer
         ) {

  
  var registry = {};
  
  registry[ SingleFrameScreen.screenType ] = singleFrameScreenDeserializer;
  
  return registry;
  
} );
