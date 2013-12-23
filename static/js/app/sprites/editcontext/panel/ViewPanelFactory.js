define( [ 'sprites/editcontext/panel/ViewPanel' ], function( ViewPanel ) {
  
  var ViewPanelFactory = function( options ) {
    
    this.make = function( editContext ) {
      
      return new ViewPanel( {
        editContext : editContext
      } );
      
    };
    
  };
  
  return ViewPanelFactory;
  
} );