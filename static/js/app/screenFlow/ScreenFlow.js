define( [ 'screenFlow/ScreenFlowNode' ], function( ScreenFlowNode ) {
  
  var ScreenFlow = function( options ) {
    
    options = options || {};
    
    var self = this;
    
    this.screenFlowNodes = options.screenFlowNodes || Array();
    this.startingScreenFlowNode = options.startingScreenFlowNode;
    
    this.toJSON = function() {
      
      var screenFlowNodesJson = Array();
      
      self.screenFlowNodes.forEach( function( curScreenFlowNode ) {
        screenFlowNodesJson.push( curScreenFlowNode.toJSON() );
      } );
      
      var startingScreenFlowNodeId = self.startingScreenFlowNode ? self.startingScreenFlowNode.id : null;
      
      return {
        screenFlowNodes : screenFlowNodesJson,
        startingScreenFlowNode : startingScreenFlowNodeId
      };
      
    };
    
  };
  
  return ScreenFlow;
  
} );