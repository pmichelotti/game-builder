define( [], function() {
  
  var Clock = function( id, options ) {
    
    options = options || {};
    
    var self = this;
    
    this.id = id;
    this.time = options.time;
    this.units = options.units;
    
    this.isTimeBased = function() {
      return !!this.time;
    };
    
    this.isUnitsBased = function() {
      return !!this.units;
    };
    
    this.isTimeBased = function() {
      return !!this.time;
    };
    
    this.toJSON = function() {
      
      return {
        id : self.id, 
        time : self.time, 
        units : self.units
      };
      
    };
    
  };
  
  return Clock;
  
} );