define( [ 'clocks/manager/NewClockForm', 'clocks/EditableClock' ], function( NewClockForm, EditableClock ) {

  var ClockManager = function( options ) {
  
    options = options || {};
    
    var self = this;
    
    this.game = ko.observable();
    
    this.currentEditableGameClock = ko.observable();
    
    this.newClockForm = new NewClockForm( {
      callback : function( newClock ) {
        if ( self.game() ) {
          self.game().gameClocks.push( newClock );
        }
      }
    } );
    
    this.manage = function( game ) {
      self.game( game );
    };
    
    this.saveCurrentGameClock = function() {
      if ( self.currentEditableGameClock() ) {
        self.game().gameClocks.replace( self.currentEditableGameClock().save() );
        self.currentEditableGameClock( null );
      }
    };
    
    this.editGameClock = function( clock ) {
      self.currentEditableGameClock( new EditableClock( clock ) );
    };
    
    this.clear = function() {
      self.game( null );
      self.currentEditableGameClock( null );
    };
    
  };
  
  return ClockManager;
  
} );
