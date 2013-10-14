define( [], function() {
  
  var ScreenFlowBranch = function( id, options ) {
  
    options = options || {};
    
    var self = this;
    
    this.id = id;
    this.transition = options.transition;
    this.node = options.node;
    
    this.toJSON = function() {
    
      return {
        id : self.id,
        transition : self.transition ? self.transition.toJSON() : null,
        node : self.node ? self.node.toJSON() : null
      };
      
    };
    
  };
  
  return ScreenFlowBranch;
  
} );