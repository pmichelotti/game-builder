define( [ 'sprites/sprite/Sprite', 'utils/uniqueIdUtil' ], function( Sprite, uniqueIdUtil ) {

  var NewSpriteForm = function( options ) {

    var self = this;

    this.name = ko.observable();
    this.id = ko.observable();
    this.idPlaceholder = ko.computed( function() {
      return uniqueIdUtil( self.name() );
    } );

    this.submit = function( form ) {

      if ( self.name() ) {

        if ( options.callback ) {
          options.callback( new Sprite( self.id() || self.idPlaceholder(), {
            name : self.name()
          } ) );
        }

      }

    };

  };

  return NewSpriteForm;

} );
