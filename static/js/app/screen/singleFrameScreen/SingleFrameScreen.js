define( [ 'shapes/Size' ], function( Size ) {

  var SCREEN_TYPE = 'single-frame-screen';

  var SingleFrameScreen = function( id, options ) {

    options = options || {};

    var self = this;

    this.id = id;
    this.name = options.name || id;

    this.size = new Size( options.width || 0, options.height || 0 );

    this.sprite = options.sprite;
    this.durration = options.durration;
    this.bypassInteraction = options.bypassInteraction || Array();

    this.toJSON = function() {

      var retObject = {};

      retObject[ 'id' ] = self.id;
      retObject[ 'name' ] = self.name;
      retObject[ 'type' ] = SCREEN_TYPE;

      return retObject;

    };
  };

  SingleFrameScreen.screenType = SCREEN_TYPE;

  return SingleFrameScreen;

} );