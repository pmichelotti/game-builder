define( [ 'shapes/Size' ], function( Size ) {

  var SCREEN_TYPE = 'single-frame-screen';

  var SingleFrameScreen = function( id, options ) {

    options = options || {};

    var self = this;

    this.id = id;
    this.name = options.name || id;

    this.size = options.size || new Size( 0, 0 );

    this.sprite = options.sprite;
    this.frame = options.frame;
    
    this.duration = options.duration;
    this.bypassInteraction = options.bypassInteraction || Array();

    this.toJSON = function() {

      var retObject = {};

      retObject[ 'id' ] = self.id;
      retObject[ 'name' ] = self.name;
      retObject[ 'type' ] = SCREEN_TYPE;

      if ( self.size ) {
        retObject[ 'size' ] = self.size.toJSON();
      }
      
      if ( self.sprite ) {
        retObject[ 'sprite' ] = self.sprite.id;
      }
      
      if ( self.frame ) {
        retObject[ 'frame' ] = self.frame.id;
      }
      
      retObject[ 'duration' ] = self.duration;
      
      if ( self.bypassInteraction ) {
        retObject[ 'bypassInteraction' ] = self.bypassInteraction.id;
      }
      
      return retObject;

    };
  };

  SingleFrameScreen.screenType = SCREEN_TYPE;

  return SingleFrameScreen;

} );