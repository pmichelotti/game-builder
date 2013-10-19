define( [ 'clocks/Clock' ], function( Clock ) {
  
  var EditableClock = function( clock ) {
  
    var self = this;
    
    this.id = clock.id;
    this.time = ko.observable( clock.time );
    this.units = ko.observable( clock.units );
    
    this.save = function() {
      return new Clock( self.id, {
        time : self.time(), 
        units : self.units()
      } );
    };
    
  };
  
  return EditableClock;
  
} );