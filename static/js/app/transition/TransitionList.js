define( [], function() {
  
  var FADE_TRANSITION = 'fade-transition';
  
  var TransitionList = [
    {
      id : FADE_TRANSITION, 
      name : 'Fade'
    }                      
  ];
  
  Object.defineProperty( TransitionList, "getTransitionById", {
    enumerable : false, 
    configurable : false, 
    writable : false, 
    value : function( id ) {
      
      var arrayOfMatches = this.filter( function( curTransition ) {
        if ( curTransition.id === id ) {
          return true;
        }
      } );
       
      if ( arrayOfMatches.length ) {
        return arrayOfMatches[ 0 ];
      }
      
      return null;
      
    }.bind( TransitionList )
  } );
  
  return TransitionList;
  
} );