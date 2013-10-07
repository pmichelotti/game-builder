define( [ 'game/Game' ], function( Game ) {

  var NewGameForm = function( options ) {

    var self = this;

    this.name = ko.observable();
    this.id = ko.observable();

    this.submit = function( form ) {
      if ( self.id() && self.name() ) {
        var newGame = new Game( self.id(), {
          name : self.name()
        } );

        if ( options.callback ) {
          options.callback( newGame );
        }
      }
    };

  };

  return NewGameForm;

} );