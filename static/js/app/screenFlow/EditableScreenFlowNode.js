define( [ 'screenFlow/ScreenFlowNode', 'screenFlow/ScreenFlowBranch', 'transition/Transition' ], 
  function( ScreenFlowNode, ScreenFlowBranch, Transition ) {
  
  var EditableScreenFlowNode = function( screenFlowNode ) {
    
    var self = this;
    
    this.screenFlowNode = screenFlowNode;
    
    this.id = screenFlowNode.id;
    this.screen = ko.observable( screenFlowNode.screen );
    this.branches = ko.observableArray( screenFlowNode.branches || Array() ).extend( { replacable : true } );
    
    this.addBranch = function( id ) {
      self.branches.push( new ScreenFlowBranch( id ) );
    };
    
    this.save = function() {
      
      return new ScreenFlowNode( self.screenFlowNode.id, {
        screen : self.screen(), 
        branches : self.branches()
      } );
      
    };
    
  };
  
  return EditableScreenFlowNode;
  
} );