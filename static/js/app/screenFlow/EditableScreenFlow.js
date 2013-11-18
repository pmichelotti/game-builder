define( [ 'screenFlow/ScreenFlow' ], function( ScreenFlow ) {

  var EditableScreenFlow = function( screenFlow ) {
  
    var self = this;
    
    this.screenFlow = screenFlow;

    this.screenFlowNodes = ko.observableArray( screenFlow.screenFlowNodes ).extend( { replacable : true } );
    this.startingScreenFlowNode = ko.observable( screenFlow.startingScreenFlowNode );
    
    this.setStartingScreenFlowNode = function( screenFlowNode ) {
      self.startingScreenFlowNode( screenFlowNode );
    };
    
    this.isStartingScreenFlowNode = function( screenFlowNode ) {
      return self.startingScreenFlowNode() === screenFlowNode;
    };
    
    this.save = function() {
      
      return new ScreenFlow( {
        screenFlowNodes : self.screenFlowNodes(), 
        startingScreenFlowNode : self.startingScreenFlowNode()
      } );
      
    };
    
  };
  
  return EditableScreenFlow;
  
} );
