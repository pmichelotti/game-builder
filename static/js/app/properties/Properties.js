define( [], function() {
  
  var Properties = function( options ) {
    
    var self = this;
    
    this.ticksPerSecond = options.ticksPerSecond;
    this.renderingClock = options.renderingClock;
    
    this.toJSON = function() {
      
      var retObject = {};
      
      retObject[ 'ticksPerSecond' ] = self.ticksPerSecond;
      
      if ( self.renderingClock ) {
        retObject[ 'renderingClock' ] = self.renderingClock.id;
      }
      
      return retObject;
      
    };
    
  };
  
  return Properties;
  
} );