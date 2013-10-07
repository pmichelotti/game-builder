define( [], function() {

  var NewScreenForm = function( options ) {

    options = options || {};

    var self = this;

    this.name = ko.observable();
    this.id = ko.observable();

    this.screenTypes = options.screenTypes || Array();

    this.screenType = ko.observable();

    this.submit = function( form ) {
      if ( self.screenType() && self.name() && self.id() ) {

        var screenConstructor = self.screenType().screenConstructor;

        var newScreen = new screenConstructor( self.id(), {
          name : self.name()
        } );

        if ( options.callback ) {
          options.callback( newScreen );
        }
      }
    };

  };

  return NewScreenForm;

} );