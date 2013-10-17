define( [ 'screenFlow/ScreenFlowBranch', 'transition/EditableTransition' ], 
    function( ScreenFlowBranch, EditableTransition ) {
  
  var EditableScreenFlowBranch = function( screenFlowBranch, screenFlowNodeOptions, transitionOptions ) {
    
    var self = this;
    
    this.screenFlowBranch = screenFlowBranch;
    
    this.id = screenFlowBranch.id;
    this.transition = ko.observable( new EditableTransition( screenFlowBranch.transition ) );
    this.node = ko.observable( screenFlowBranch.node );
    
    this.screenFlowNodeOptions = screenFlowNodeOptions;
    this.transitionOptions = transitionOptions;
    
    this.save = function() {
    
      return new ScreenFlowBranch( 
        self.screenFlowBranch.id, 
        {
          transition : self.transition().save(), 
          node : self.node()
      } );
      
    };
    
  };
  
  return EditableScreenFlowBranch;
  
} );