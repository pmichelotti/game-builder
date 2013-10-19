define( [ 'clocks/Clock' ], function( Clock ) {
  
  var NewClockForm = function( options ) {
    
    options = options || {};
    
    var self = this;
    
    this.id = ko.observable();
    this.time = ko.observable();
    this.units = ko.observable();
    
    this.clear = function() {
      self.id( '' );
      self.time( '' );
      self.units( '' );
    };
    
    this.submit = function( form ) {
      
      if ( options.callback ) {
        options.callback( new Clock( self.id(), {
          time : self.time(), 
          units : self.units()
        } ) ); 
        
        self.clear();
      }
      
    };
    
  };
  
  return NewClockForm;
  
} );