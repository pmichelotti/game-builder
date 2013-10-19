define( [ 'clocks/Clock' ], function( Clock ) {
  
  var makeGameClock = function( json ) {
    return new Clock( json.id, {
      units : json.units, 
      time : json.time
    } );
  };
  
  return {
    makeGameClock : makeGameClock
  };
  
} );