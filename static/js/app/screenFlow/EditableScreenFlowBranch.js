define( [ 'screenFlow/ScreenFlowBranch', 'transition/EditableTransition' ], 
    function( ScreenFlowBranch, EditableTransition ) {
  
  var EditableScreenFlowBranch = function( screenFlowBranch ) {
    
    var self = this;
    
    this.screenFlowBranch = screenFlowBranch;
    
    this.transition = ko.observable( new EditableTransition( screenFlowBranch.transition ) );
    this.node = ko.observable( screenFlowBranch.node );
    
    this.save = function() {
    
      return new ScreenFlowBranch( {
        transition : self.transition().save(), 
        node : self.node().save()
      } );
      
    };
    
  };
  
  return EditableScreenFlowBranch;
  
} );