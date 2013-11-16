define( [], function() {
  
  var ArrayDecorator = function( a ) {
    
    this._array = a || Array();
    
  };
  
  ArrayDecorator.prototype.filterById = function( item ) {
    
    var filteredArray = this._array.filter( function( curItem ) {
      
      if ( curItem && item && curItem.id === item ) {
        return true;
      }
      
    } );
    
    if ( filteredArray.length ) {
      return filteredArray[ 0 ];
    }
    
    return null;
    
  };
  
  return ArrayDecorator;
  
} );