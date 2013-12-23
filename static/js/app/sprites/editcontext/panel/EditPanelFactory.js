define( [ 'sprites/editcontext/panel/EditPanel' ], function( EditPanel ) {
  
  var EditPanelFactory = function( options ) {
  
    this.make = function( editContext, spriteFrame ) {
    
      return new EditPanel( {
        editContext : editContext, 
        spriteFrame : spriteFrame
      } );
      
    };
    
  };
  
  return EditPanelFactory;
  
} );