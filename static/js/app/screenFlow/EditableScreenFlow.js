define( [ 'screenFlow/ScreenFlow' ], function( ScreenFlow ) {

  var EditableScreenFlow = function( screenFlow ) {
  
    var self = this;
    
    this.screenFlow = screenFlow;

    this.screenFlowNodes = ko.observableArray( screenFlow.screenFlowNodes ).extend( { replacable : true } );
    this.startingScreenFlowNode = ko.observable( screenFlow.startingScreenFlowNode );
    
    this.save = function() {
      
      return new ScreenFlow( {
        screenFlowNodes : self.screenFlowNodes(), 
        startingScreenFlowNode : self.startingScreenFlowNode()
      } );
      
    };
    
  };
  
  return EditableScreenFlow;
  
} );
