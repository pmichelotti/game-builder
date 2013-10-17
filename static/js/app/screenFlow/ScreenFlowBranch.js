define( [ 'transition/Transition' ], function( Transition ) {
  
  var ScreenFlowBranch = function( id, options ) {
  
    options = options || {};
    
    var self = this;
    
    this.id = id;
    this.transition = options.transition || new Transition();
    this.node = options.node;
    
    this.toJSON = function() {
    
      return {
        id : self.id,
        transition : self.transition ? self.transition.toJSON() : null,
        node : self.node ? self.node.id : null
      };
      
    };
    
  };
  
  return ScreenFlowBranch;
  
} );