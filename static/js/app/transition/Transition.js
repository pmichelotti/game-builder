define( [], function() {
  
  var Transition = function( options ) {
  
    options = options || {};
    
    var self = this;
    
    this.outType = options.outType;
    this.outDuration = options.outDuration;
    this.inType = options.inType;
    this.inDuration = options.inDuration;
    
    this.toJSON = function() {
      return {
        outType : self.outType,
        outDuration : self.outDuration, 
        inType : self.inType, 
        inDuration : self.inDuration
      };
    };
    
  };
  
  return Transition;
  
} );