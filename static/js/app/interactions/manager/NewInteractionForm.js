define( [ 'interactions/Interaction', 'utils/uniqueIdUtil' ], function( Interaction, uniqueIdUtil ) {

  var NewInteractionForm = function( options ) {

    options = options || {};

    var self = this;

    this.name = ko.observable();

    this.submit = function( form ) {
      if ( self.name() ) {

    	  if ( options.callback ) {
    		  options.callback( new Interaction( uniqueIdUtil( self.name() ), self.name(), Array() ) );
    	  }
    
      }
    };

  };

  return NewInteractionForm;

} );