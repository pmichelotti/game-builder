define( [], function() {
  
  var ScreenFlowNode = function( id, options ) {
    
    options = options || {};
    
    var self = this;
    
    this.id = id;
    
    this.screen = options.screen;
    this.branches = options.branches || Array();
    
    this.toJSON = function() {
      
      var retObject = {};
      
      retObject[ 'id' ] = id;
      retObject[ 'screen' ] = self.screen.id;
      retObject[ 'branches' ] = Array();
      
      self.branches.forEach( function( curBranch ) {
        retObject[ 'branches' ].push( curBranch.toJSON() );  
      } );
      
      return retObject;
      
    };
    
  };
  
  return ScreenFlowNode;
  
} );