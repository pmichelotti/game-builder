define( [], function() {

  var uniqueIdUtil = function( seed ) {

    seed = seed || 'id';

    var cleanSeed = seed.replace( /\W/g, '-' );

    var date = new Date();

    return cleanSeed + date.valueOf();
  };

  return uniqueIdUtil;

} );