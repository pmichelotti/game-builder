define( [ 'shapes/Size' ], function( Size ) {

  var SingleFrameScreen = function( id, options ) {

    options = options || {};

    this.id = id;
    this.name = options.name || id;

    this.size = new Size( options.width || 0, options.height || 0 );

    this.sprite = options.sprite;
    this.durration = options.durration;
    this.bypassInteraction = options.bypassInteraction || Array();

    this.toJSON = function() {

    };
  };

  return SingleFrameScreen;

} );