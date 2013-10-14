define( [ 'screenFlow/ScreenFlowBranch' ], function( ScreenFlowBranch ) {
  
  var NewScreenFlowBranchForm = function( options ) {
    
    options = options || {};
    
    var self = this;
    
    this.id = ko.observable();
    
    this.submit = function() {
      
      if ( options.callback && self.id() ) {
        options.callback( new ScreenFlowBranch( self.id() ) );
      }
      
    };
    
    this.clear = function() {
      
      self.id( null );
      
    };
    
  };
  
  return NewScreenFlowBranchForm;
  
} );