define( [ 'transition/Transition', 'transition/TransitionList', 'screenFlow/ScreenFlowNode', 'screenFlow/ScreenFlowBranch', 'screenFlow/ScreenFlow' ], function( Transition, TransitionList, ScreenFlowNode, ScreenFlowBranch, ScreenFlow ) {
  
  var makeTransitionForJson = function( json ) {
    
    var outTransition = TransitionList.getTransitionById( json.outType );
    var inTransition = TransitionList.getTransitionById( json.inType );
    
    return new Transition( {
      outType : outTransition, 
      outDuration : json.outDuration, 
      inType : inTransition,
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
            var node = screenFlowNodesMap[ curScreenFlowBranch.node ];
            
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