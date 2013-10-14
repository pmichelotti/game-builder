define( [ 'screenFlow/ScreenFlowNode' ], function( ScreenFlowNode ) {
  
  var NewScreenFlowNodeForm = function( options ) {
    
    options = options || {};
    
    var self = this;
    
    this.screens = options.screens;
    
    this.id = ko.observable();
    this.screen = ko.observable();
    
    this.submit = function() {
      
      if ( options.callback && self.id() ) {
        options.callback( new ScreenFlowNode( self.id(), { screen : self.screen() } ) ); 
      }
      
    };
    
    this.clear = function() {
    
      self.id( null );
      self.screen( null );
      
    };
    
  };
  
  return NewScreenFlowNodeForm;
  
} );