define( [ 'transition/Transition', 'screenFlow/ScreenFlowNode', 'screenFlow/ScreenFlowBranch', 'screenFlow/ScreenFlow' ], function( Transition, ScreenFlowNode, ScreenFlowBranch, ScreenFlow ) {
  
  var makeTransitionForJson = function( json ) {
    
    return new Transition( {
      outType : json.outType, 
      outDuration : json.outDuration, 
      inType : json.inType,
      inDuration : json.inDuration
    } );
    
  };
  
  var makeScreenFlow = function( json, screens ) {
    
    var screenFlowNodes = Array();
    var screenFlowNodesMap = {};
    var screenMap = {};
    
    if ( screens && screens.length ) {
      screens.forEach( function( curScreen ) {
        screenMap[ curScreen.id ] = curScreen;
      } );
    }
    
    if ( json.screenFlowNodes && json.screenFlowNodes.length ) {
      /*
       * Create all Screen Flow Nodes sans branches
       */
      json.screenFlowNodes.forEach( function( curScreenFlowNodeJson ) {
        var curNodeScreen = screenMap[ curScreenFlowNodeJson.screen ];
        
        var newScreenFlowNode = new ScreenFlowNode( curScreenFlowNodeJson.id, {
          screen : curNodeScreen
        } );
        
        screenFlowNodes.push( newScreenFlowNode );
        screenFlowNodesMap[ newScreenFlowNode.id ] = newScreenFlowNode;
      } );
      
      /*
       * Populate the screen flow node branches
       */
      json.screenFlowNodes.forEach( function( curScreenFlowNodeJson ) {
        
        var curNodeBranches = Array();
        
        if ( curScreenFlowNodeJson.branches && curScreenFlowNodeJson.branches.length ) {
          
          curScreenFlowNodeJson.branches.forEach( function( curScreenFlowBranch ) {
            
            var transition = makeTransitionForJson( curScreenFlowBranch.transition );
            var node = screenFlowNodesMap[ curScreenFlowBranch.id ];
            
            curNodeBranches.push( new ScreenFlowBranch( curScreenFlowBranch.id, {
              transition : transition, 
              node : node
            } ) );
            
          } );
          
          screenFlowNodesMap[ curScreenFlowNodeJson.id ].branches = curNodeBranches;
          
        }
        
      } );
    }
    
    return new ScreenFlow( {
      screenFlowNodes : screenFlowNodes
    } );
  };
  
  return {
    makeScreenFlow : makeScreenFlow
  };
  
} );